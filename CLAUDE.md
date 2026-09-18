# Claude Code 作業ルール

## 共通方針

- 回答は日本語で行う
- 既存コードの構造を尊重する
- 変更は最小限にする
- 不要なリファクタリングをしない
- 勝手に命名規則を変えない
- 修正前に「原因」「変更方針」「影響範囲」を説明する

## 作業進行ルール

- ファイルを編集する前に、必ず変更内容を提示して確認を取る
- 確認前にいきなりファイルへ反映しない
- NGの場合は、指摘内容を反映して再提案する
- 「実装して」「反映して」と明示された場合のみファイルを編集する
- 同一パターンの変更を複数箇所に適用する場合は、1回のEditで対象ブロック全体をまとめて置き換える。個別Edit呼び出し禁止。

## CSS / SCSS 共通ルール

### 設計・構造

- フォルダ構成は FLOCSS に従う（foundation / global / layout / object）
- クラスプレフィックスを必ず使う：`l-`（レイアウト）/ `c-`（コンポーネント）/ `p-`（ページ固有）/ `u-`（ユーティリティ）
- BEM の `__`（要素）と `--`（モディファイア）を使う。ネストは2段階まで
- `component/` は再利用可能なパーツのみ。ページ固有の文脈を持たせない
- 見出しは基本`c-primary-title`（最も重要な見出し）を使い、続いて`c-secondary-title`など段階的なクラスを使う。新規に見出し用コンポーネントを作らず、既存の`c-primary-title`／`c-secondary-title`を確認してから拡張する
- タイトルに付随するサブテキスト（ラベル・キャッチコピーなど）がある場合、親要素には`<hgroup>`タグを使う
- `project/` は `top/` または `under/` に配置する

## SCSSファイル作成ルール

- 新しいSCSSファイルを作成する際は、まずクラス名・セレクターのみ記述する
- 予測でプロパティを書かない
- 必ず対応するHTMLを参照し、実際に使われているクラス名をもとに作成する
- セレクターは既存の命名規則に合わせる
- BEM形式の場合は `&__element` 形式で列挙する
- `{}` は同じ行に記述する
- 各セレクター間は1行あける
- l-headerの中に入っているのでheaderの中に入ってるクラスはファイル作成不要
- 新規SCSSファイルの先頭には、既存ファイルに合わせて `@use` とコメントヘッダーを記述する
- 新規SCSSファイルを作成した場合は、親の読み込みファイル（例：style.scss）への `@use` 追加を忘れない
- `@use` のパスは既存ファイルを確認して合わせる

### メディアクエリ

- `@include mq()` のみ使用。インライン `@media` 禁止
- ブレークポイントを追加する場合は `_breakpoints.scss` のマップに定義してから使う

### 変数・mixin

- カラーは変数を経由する。変数にない色は `_variable.scss` に追加してから使う。ハードコードは禁止
- ただしグレー系（`#555`、`#777`など）は変数化せず、使用箇所に直接記述する
- 変数を勝手に増やさない。グレー以外で既存変数に無い色が必要な場合は、追加前に確認する
- mixin を定義した場合は必ず使う。使わない mixin は定義しない

### letter-spacing

- ベースの`letter-spacing`は`0.02em`（body等に指定済み）
- Figmaのtracking値が0のテキストは、ベースの0.02emがそのまま適用されるため、`letter-spacing: 0;`や`letter-spacing: 0.02em;`を個別に指定しない
- Figmaのtracking値÷font-size（px）が0.02em以外の比率になる場合のみ、そのセレクターに`letter-spacing`を明示的に指定する（例：tracking-1.26px/18px=0.07em → `letter-spacing: 0.07em;`）
- 新しいテキストスタイルを実装するときは、見出しに限らずボタンやラベルも含めて毎回この比率を確認する

### font-size

- ベースの`font-size`は`1.6rem`（16px、body等に指定済み）
- Figmaで16pxのテキストは、ベースの1.6remがそのまま適用されるため、`font-size: 1.6rem;`を個別に指定しない
- Figmaのfont-sizeが16px以外の場合のみ、そのセレクターに`font-size`を明示的に指定する
- `@include mq()`内で、そのクラス自身のPC時の値（16px以外）から16pxへ縮小する場合は、ベースの上書きとして`font-size: 1.6rem;`を明示してよい（この場合はベースへの単純な重複指定ではないため）
- 新しいテキストスタイルを実装するときは、letter-spacingと同様にfont-sizeも毎回16pxかどうかを確認する

### その他

- `!important` は原則使わない
- 共通クラスを変更する場合は使用箇所を確認する
- CSS だけで対応できる場合は CSS を優先する
- JavaScript を追加する場合は理由を説明する
- 英文字は見た目が大文字表示でも、HTML上は先頭のみ大文字・残りは小文字で記述し、見た目の大文字化は `text-transform: uppercase;` で行う
- テキストは基本的に改行ごとにpタグで分けない。1つのpタグ内で`<br>`を使って改行する
- pタグを分けるのは、テキストとテキストの間に視覚的な余白（margin）が必要な場合のみ
- pタグには必ずクラス名を付ける（クラスなしのpタグを作らない）
- pタグ間の余白は、同じクラス同士の隣接セレクタで指定する

```scss
.p-example__text+.p-example__text {
  margin-top: 20px;
}
```
- `_base.scss` など既存のベーススタイルで指定済みのプロパティは、個別クラスで重複指定しない（例：`img`は`height: auto;`が指定済みのため個別に書かない）

### PC/SPで改行位置が異なる場合の`<br>`

- PC/SPでFigmaの改行位置が異なるテキストは、共通の改行位置はクラス無しの`<br>`のまま、片方のブレークポイントにしか無い改行だけにクラスを付ける
- SPにのみ存在する改行：`<br class="u-only-sp">`
- PCにのみ存在する改行：`<br class="u-only-pc">`
- 両方に共通する改行位置にはクラスを付けない（`u-only-sp`と`u-only-pc`を両方並べたりしない）
- ユーティリティクラス名は`u-only-pc`/`u-only-sp`

```html
<p class="p-example__text">建物は、<br class="u-only-sp">つくって終わりではありません。<br>私たち信成建設は、土木・建築から内装・設備まで各種工事を一貫して手がけ、</p>
```

### Figma由来の不明瞭な数値の扱い

- Figmaのコードで数値が確定できない場合（例：1px幅など実質ゼロに近いスペーサーframe）、それらしい値を推測して埋めない
- 確定できない余白は0として扱うか、実装前に必ずユーザーに確認する
- 「対称にしておく」「自然に見える値にする」といった見た目基準の憶測は禁止

### padding

- `padding`の数値に小数点は絶対に使わない
- 上下（左右）均等に割り付けたい余白がFigma実測で奇数の場合、片側だけに寄せたりせず、必ず上下（左右）均等のまま最も近い偶数に丸めて整数のpaddingにする（例：15pxなら`padding: 8px 0;`のように16px相当に丸める）

### 装飾要素の実装ルール

- ドット、ライン、矢印などテキスト情報を持たない単純な装飾要素は、装飾専用のHTMLタグ（`<span>`など）を追加せず、`::before` / `::after` 疑似要素で実装する。例外を作らず必ず適用する
- 同一ページ内・同一コンポーネント内に同種の装飾がすでにHTMLタグで実装されている場合も、気づいた時点で疑似要素に置き換える（新規実装分だけを直して終わりにしない）
- 疑似要素ブロックの先頭には必ず `content: '';` を記述する
- プロパティの記述順は「SCSSプロパティの記述順」ルールに従う

### ボタン実装ルール

- ホバー時に背景色とテキスト色を反転させるボタンは、基本状態から必ず `border: 1px solid` を入れる。ボーダーが無いと、ホバーで背景が変わった際にページ背景と同化して見えなくなるため
- ボーダー色はホバーで切り替えず、基本状態から反転後の文字色と同じ色（多くの場合白)で固定しておく。背景色と同じ色のボーダーにすると、基本状態・ホバー状態のどちらかでページ背景（グラデーションなど）と同化して輪郭が見えなくなるため。白ボーダーを最初から入れておけば、ホバーで背景が変わっても常に輪郭が保たれる
- アイコンの色反転は、可能な場合は基本的にCSSの `mask`（`mask: url(...) no-repeat center/cover;` + `background-color`）で実装する。`background-color` の切り替えだけでアイコン色を反転できるため、`<img>` の差し替えやSVGの `fill` 切り替えより優先する
- Figma上でボタンのアイコンがテキストとは独立して配置されている（テキストの`gap`に含まれず、ボタン内の固定位置にある）場合は、アイコンをflexの`gap`で並べず、ボタン本体に `position: relative;` を付け、アイコン疑似要素側を `position: absolute;` でFigmaの実測オフセット（右端からの距離・垂直中央など）を基準に配置する

#### ボタンのサイズ・paddingの決め方

- ボタンの横幅は、Figmaの実寸を `max-width` で指定し、`width: 100%` で親に追従させる。`padding`を目一杯入れて幅を作らない
- 横`padding`は「最低限確保したい余白」だけを指定し、余裕を持たせる。`justify-content: center;`で中央寄せすれば、最大幅時の見た目はFigma通りのまま、幅が縮んだときはpaddingではなく余白側から詰まる
- Figmaの余白をそのまま横paddingに入れると、デバイス幅などでボタンが縮んだときにテキストが折り返して崩れるため禁止
- アイコンの疑似要素には `flex-shrink: 0;` を付け、縮小時にアイコンが潰れてテキストが押し出されないようにする

```scss
.c-example-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 249px;
  padding: 16px;

  &::before {
    content: '';
    display: block;
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }
}
```

```scss
.c-example-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: 1px solid #fff;
  background-color: $main-color;
  color: #fff;

  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    right: 24px;
    transform: translateY(-50%);
    width: 24px;
    height: 24px;
    background: #fff;
    mask: url(../img/icon/icon_example.svg) no-repeat center/cover;
    background-size: contain;
    background-repeat: no-repeat;
  }

  &:hover,
  &:focus-visible {
    background-color: #fff;
    color: $main-color;

    &::after {
      background-color: $main-color;
    }
  }
}
```

### リンク付きカード

- リンクがあるカードは、矢印やタイトルだけをリンクにせず、カード全体をクリッカブルにする
- カード要素（`__card`など）の直下に`<a>`を入れ、画像・テキストをまとめて包む
- 矢印などのリンク装飾は、その`<a>`の`::before` / `::after`で実装する（リンクの入れ子を作らない）
- ホバー時は画像だけを少し拡大する（`transform: scale(1.05);`）。カード自体は拡大しない
- 画像の親要素に`overflow: hidden;`を指定し、拡大した画像が枠からはみ出さないようにする
- 右下の矢印は円ごと少し右へ動かす（`transform: translateX(6px);`）
- 画像の拡大・矢印の移動はどちらも`<a>`のホバーで指定し、`transition: transform 0.25s;`を併記する

```html
<div class="p-example__card">
  <a class="p-example__card-link" href="">
    <div class="p-example__card-img"><img src="" alt=""></div>
    <div class="p-example__card-body"></div>
  </a>
</div>
```

### ナビ・テキストリンクのホバー

- ナビゲーションなど、色反転ではなく単純なテキストリンクは、ホバー時に `opacity: $hover-opacity;`（0.7）にする
- `transition: opacity 0.25s;` を必ず併記する
- ボタン（`c-btn`など背景色反転タイプ）には適用しない。あくまでテキストリンクが対象

```scss
.c-example-link {
  transition: opacity 0.25s;

  &:hover,
  &:focus-visible {
    opacity: $hover-opacity;
  }
}
```

### ナビ項目間の余白

- ナビゲーションなど`<a>`タグが並ぶリストの項目間の余白は、リスト側の`gap`ではなく、`<a>`タグ自身の`padding`で作る。クリッカブル範囲を保つため
- 隣接する`<a>`のpaddingが合計で目的の余白になるよう左右（縦並びの場合は上下）に均等に振り分ける
- 先頭要素の外側の余白と末尾要素の外側の余白は、`&:first-child`/`&:last-child`で該当方向のpaddingを`0`にして打ち消す

```scss
.c-example-nav {
  &__list {
    display: flex;
  }

  &__item {
    &:first-child {
      .c-example-nav__link {
        padding-left: 0;
      }
    }
    &:last-child {
      .c-example-nav__link {
        padding-right: 0;
      }
    }
  }

  &__link {
    display: block;
    padding: 0 20px;
  }
}
```

### モディファイヤーの付け方

- 同じ役割・構造を持つ要素が複数の見た目パターン（配置・色・サイズなど）を持つ場合、素のクラス（無印）を基本（デフォルト）の見た目とし、それ以外のパターンには `--` のモディファイヤーを付けて上書きする
- どちらが基本かは頻度や用途で判断し、基本パターンに条件分岐やモディファイヤーを付けない。基本から外れる方にのみモディファイヤーを付ける
- 例：見出しコンポーネント `c-heading` はセンター揃えを基本とし、左揃えは `c-heading--left` で上書きする

```scss
.c-heading {
  align-items: center;
  text-align: center;

  &--left {
    align-items: flex-start;
    text-align: left;
  }
}
```

### SCSSプロパティの記述順

SCSSのプロパティは、原則として以下の順番で記述する。

1. `display`
   - `display: flex;` または `display: grid;` の直後に、関連プロパティをひとまとまりで記述する
   - Flex関連：`flex-direction` → `justify-content` → `align-items` → `flex-wrap` → `gap`
   - Grid関連：`grid-template-columns`、`grid-template-rows`、`grid-column`、`grid-row`、`gap`など

2. `position`
   - `position` → `top` → `right` → `bottom` → `left` → `transform`
   - `transform`は、positionによるセンタリングなど位置調整に使用する場合、このグループに含める

3. サイズ
   - `width` → `max-width` → `min-width` → `height` → `min-height` → `max-height`

4. 枠線
   - `border` → `border-top`、`border-right`、`border-bottom`、`border-left` → `border-radius`

5. 背景
   - `background` → `background-color` → `background-image` → `background-position` → `background-size` → `background-repeat`

6. `box-shadow`

7. `color`

8. フォント・文字
   - `font-family` → `font-size` → `font-weight` → `line-height` → `letter-spacing` → `text-align`
   - 必要に応じて`text-decoration`、`text-transform`、`white-space`などをこのグループ内に記述する

9. `padding`
   - `padding`、`padding-top`、`padding-right`、`padding-bottom`、`padding-left`

10. `margin`
    - `margin`、`margin-top`、`margin-right`、`margin-bottom`、`margin-left`
    - margin系は基本的にプロパティ列の終盤へ配置する

11. `transition`
    - 必要に応じて`animation`もこの付近に記述する

12. `z-index`

13. その他
    - `cursor` → `overflow` → `object-fit` → `aspect-ratio`
    - 上記に含まれないプロパティも、役割の近いグループにまとめる

14. `@include mq(...)`
    - メディアクエリは、親セレクタ内の通常プロパティ列の最後に記述する
    - ネストセレクタより前に配置する
    - `@include mq(...) {` の直前に空行を入れない（絶対ルール）。直前が通常プロパティでも、別の`@include mq(...)`ブロックの閉じ`}`でも、空行を挟まず詰めて書く

15. ネストセレクタ
    - `&::before`、`&::after`、`&:hover`、`&:focus`、`&__element`、`&--modifier`などは、親要素の通常プロパティとmixinをすべて記述した後に配置する
    - 疑似要素ブロック内では、`content`を最初に記述する
    - ネストセレクタ内でも、この記述順を基本とする

### マージンの付け方

- 要素間の余白は `margin-top` を基本とする。`margin-bottom` は使わない
- `& + *` や `.p-example__text + *` のような隣接セレクタで次の要素に余白を付けない（禁止）
- 余白は、余白を持つ要素自身のクラスに `margin-top` を指定する
- `c-` コンポーネントに余白が必要な場合は、同じ要素にページ固有のクラス（例：`p-mv__btn`）を追加し、そちらに `margin-top` を指定する。`c-` 側にはページ固有の余白を持たせない
- 唯一の例外として、タイトル（見出し）の下にデザイン上共通の余白が付く場合のみ、見出し側に `& + *` を使って直後の要素へ `margin-top` を持たせてよい

```scss
.c-example-title {
  &+* {
    margin-top: 30px;
  }
}
```

```html
<a class="c-example-btn p-example__btn" href="">テキスト</a>
```

```scss
.p-example__title {
  margin-top: 20px;
}

.p-example__btn {
  margin-top: 40px;
}
```

### レイアウトの配置方法（Figma座標の直転記禁止）

- Figmaの`x`/`y`座標を、そのままCSSの`top`/`left`/`width`や、それらと等価なpadding・widthの数値に転記してレイアウトを組み立てない。これは`position: absolute`を使っているかどうかに関係なく、flexboxやGridで実装する場合でも同様に禁止（例：Figmaのx座標の差分を再現するためだけに`padding: 60px 98px 60px 91px;`のような非対称な値や、子要素の`width: 820px;`のようなFigma実測幅をそのまま置くのはNG）
- 要素同士の配置は、`display: flex`（`gap`/`justify-content`/`flex`）やGridなど、通常のドキュメントフローと相対的なサイズ指定（`flex: 1`、`%`、`max-width`など）で組み立てる
- コンテナ全体の基準幅・gutter・gapなど「設計上の定数」としてのpx値（例：`.l-header`の`max-width: 1600px`や`padding: 0 60px`）は、Figma座標の転記ではなく意図を持った基準値なので使ってよい
- `position: absolute`は、装飾要素・バッジ・アイコン・中央寄せ（`left: 50%; transform: translateX(-50%);`など）といった、意図的に通常フローから外す局所的な用途に限定する
- どうしても複数要素をFigmaの座標通りに重ねて配置する必要がある場合（写真コラージュなど）は、実装前に必ずユーザーに相談する

### Gridレイアウト

- 汎用的なグリッドは、既存の `.l-grid` と `.l-grid--col2`、`.l-grid--col3` を組み合わせて使用する
- `.l-grid` の既定gapと異なる場合は、無理に `.l-grid` を使用せず、ページ固有またはコンポーネント固有のクラス側でGridを指定する
- 個別にGridを指定する場合も、以下の書き方に統一する

```scss
.p-example__list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px 70px;
  @include mq(md) {
    grid-template-columns: repeat(1, 1fr);
    gap: 30px;
  }
}
```

### インナー幅ルール
- コンテンツ幅は案件ごと・セクションごとにFigmaから読み取り、その値を基準にする
- gapを調整した場合は、親幅を維持したまま子要素の幅をGridで均等に算出する
- `__inner`は`.l-inner`と同じく「横幅の最大値・左右paddingによる中央寄せ」専用の要素とし、`display: flex`や`justify-content`などの並び順を決めるレイアウト指定を持たせない
- `__inner`の直下の要素を横並び・縦並びにしたい場合は、`__inner`の中にさらに専用の親要素（例：`__content`）を作り、そこにflex/gridを指定する

### 画像ルール

- Figma MCPで画像を書き出す場合、`download_assets`の`rawImages`（アップロード元の未加工画像）は使用しない
- 画像が配置されているフレーム（ノード）自体を指定して`export`を取得し、Figma側で実際にレンダリングされたクロップ・拡大・位置合わせ済みの画像をそのまま使う
- 切り取り位置・拡大率・トリミング範囲を自前で計算・推測しない
- Figmaから画像を書き出す場合、ビットマップ画像は原則として表示サイズの2倍で書き出す
- アイコン、ロゴ、単純な図形はSVGを使用する
- 通常の写真は必ずJPGを使用する
- 透過画像、イラスト、図版、作図などの非写真素材はPNGを使用する
- SVGは2倍書き出し不要
- 画像は`assets/img`配下へ保存し、既存の命名規則に合わせる
- あらかじめ同一比率で用意された静止画像（Figma書き出しなど）は、`height`固定＋`object-fit: cover`を使わず、`width: 100%;`のみで実装する（`height: auto;`はベーススタイルで指定済みのため個別指定不要）
- 投稿記事など画像比率が不定になる動的なコンテンツの画像には、`aspect-ratio`で比率を指定する
- HTMLタグの属性は途中で改行せず、開始タグを1行で記述する
- `width`と`height`には、デザイン（Figma）上の表示サイズを指定する。ビットマップ画像を2倍で書き出した場合でも、書き出しファイルの実ピクセル数（2倍サイズ）をそのまま入れない。表示サイズ＝書き出しファイルのピクセル数 ÷ 2（例：1128×560で書き出した場合、`width="564" height="280"`と指定する）
- ファーストビュー以外の画像には原則`loading="lazy"`を付ける
- ファーストビュー画像には`loading="lazy"`を付けない
- 装飾画像は`alt=""`、意味のある画像には内容に応じた`alt`を設定する
- トップページで使用する画像は、原則として`assets/img/top`配下へ保存する
- 下層ページで使用する画像は、原則として`assets/img/under`配下へ保存する
- 案件固有の画像配置ルールがある場合は、個別の指示を優先する
- 角丸が必要な画像は、画像ファイル自体に丸め処理を焼き込まず、CSS（`border-radius`／`overflow: hidden`）で実装する
- Figmaから画像を書き出す際、対象ノードに角丸（clip）が設定されていても、書き出し画像はできるだけ矩形のまま扱い、角丸はCSS側で再現する

#### 通常画像のPC・SP出し分け

```html
<picture>
  <source media="(min-width: 768px)" srcset="" width="" height="">
  <source media="(max-width: 767px)" srcset="" width="" height="">
  <img src="" alt="" width="" height="" loading="lazy">
</picture>
```

## WordPress 共通ルール

- functions.php、テンプレートファイル、ACF、CF7の影響を考慮する
- WP_Queryを使う場合は wp_reset_postdata() の必要性を確認する
- 出力時は esc_html、esc_url、wp_kses_post などを意識する
- プラグイン出力HTMLは直接編集できない可能性を考慮する

## Shopify 共通ルール

- Liquid、section、snippet、schema、settings の関係を壊さない
- アプリ生成コードは直接変更できない前提で考える
- テーマ更新で壊れやすい修正は注意する

## このプロジェクト固有のルール

- ここに案件ごとの注意点を書く
- 触ってはいけないファイルがあれば書く
- 特殊なフォルダ構成があれば書く