# next/image の `loading="eager"` と LCP

ポケモン詳細ページ（`/pokemon/[name]`）を開いたときにターミナルへ出た警告をきっかけに、画像の読み込みタイミングについてまとめます。

## 1. 出ていたメッセージ

```
[browser] Image with src "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png" was detected as the Largest Contentful Paint (LCP). Please add the `loading="eager"` property if this image is above the fold.
```

- 先頭の `[browser]` は、ブラウザ側で検出されたことを示します
- **エラーではなく警告です。**ページはステータス200で正常に表示されています
- 開発中（`npm run dev`）にだけ出る、パフォーマンス改善のアドバイスです

意味は次のとおりです。

> この画像はページで一番大きく表示される要素（LCP）です。開いてすぐ見える位置にある（above the fold）なら、`loading="eager"` を付けてください。

## 2. 用語

| 用語 | 意味 |
|---|---|
| **LCP**（Largest Contentful Paint） | ページで一番大きな要素が表示されるまでの時間。Google が重視する表示速度の指標の1つ |
| **above the fold** | スクロールしなくても最初から見える範囲 |
| **lazy loading**（遅延読み込み） | 画像が画面に入りそうになってから読み込むこと |

## 3. `loading` 属性とは

画像を**いつ読み込むか**をブラウザへ伝える属性です。Next.js 独自の機能ではなく、HTML の `<img>` タグにもともとある属性です（`<img loading="lazy">`）。`next/image` はこれをそのまま `<img>` に渡しています。

| 値 | 読み込むタイミング | 向いている画像 |
|---|---|---|
| `lazy`（`next/image` の初期設定） | 画面に入りそうになってから | スクロールしないと見えない画像 |
| `eager` | ページを開いた直後 | 開いた瞬間に見える画像 |

### なぜ `lazy` が初期設定なのか

100件の画像が並ぶ一覧ページを考えます。全部を最初に読み込むと、まだ見ていない画像のために通信が発生し、ページ全体が遅くなります。そこで `next/image` は、見えるまで読み込みを後回しにする `lazy` を標準にしています。

### なぜ詳細ページでは `eager` にするのか

詳細ページのポケモン画像は、ページを開いた瞬間に画面の中央に出る一番大きな要素です。`lazy` のままだと、次の手順を踏んでから読み込みが始まります。

1. ブラウザがページの組み立てと配置の計算を終える
2. 「この画像は画面内にある」と判定する
3. やっと画像の読み込みを始める

この待ち時間のぶん、画像が出るのが遅れ、LCP が悪くなります。`eager` にすると、HTML を受け取った時点で読み込みが始まります。

## 4. 修正内容

`app/pokemon/[name]/page.js` の `<Image>` に `loading="eager"` を1行追加しました。

```jsx
<Image
  src={getArtworkUrl(pokemon.id)}
  alt={pokemon.name}
  width={320}
  height={320}
  // ファーストビューで最も大きい要素（LCP）なので遅延読み込みせず即座に読み込む
  loading="eager"
/>
```

修正後に `/pokemon/bulbasaur` を開き直し、警告が出なくなったことを確認してください。

## 5. 使い分けの目安

- **`loading="eager"` を付ける**: 開いた瞬間に見える画像（詳細ページのメイン画像、トップのヒーロー画像、一覧の最初の数枚）
- **何も書かない（`lazy` のまま）**: それ以外のすべて

一覧ページの全画像に `eager` を付けると、遅延読み込みの効果がなくなり逆効果です。付けるのは最初に見える数枚だけにします。

## 6. 補足: `priority` は使わない

古い記事では `<Image priority />` を使う例がよく出てきます。**Next.js 16 から `priority` は非推奨になりました。**代わりに次のどれかを使います。

| 書き方 | 役割 |
|---|---|
| `loading="eager"` | 遅延読み込みをやめて、すぐ読み込む（今回の方法） |
| `fetchPriority="high"` | ほかの画像より優先して読み込むよう、ブラウザに伝える |
| `preload` | `<head>` に事前読み込みの指示を入れる |

公式ドキュメントでは、ほとんどの場合は `preload` ではなく `loading="eager"` か `fetchPriority="high"` を使うよう案内されています。

参考: [Next.js Image コンポーネント（loading）](https://nextjs.org/docs/app/api-reference/components/image#loading)
