# Tennis365

### <a href="https://sleepy-austin-0254fa.netlify.app/">사이트 바로가기</a>

#### Develop Tool

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

#### BackEnd Framework & DB

<img src="https://img.shields.io/badge/Node-v14.16.0-green.svg" /> <img src="https://img.shields.io/badge/express-v4.17.1-red.svg" />
<img src="https://img.shields.io/badge/mysql-v5.7.10-red.svg" />

#### BackEnd Library

<img src="https://img.shields.io/badge/bcrypt-v3.0.5-green.svg" /><img src="https://img.shields.io/badge/axios-v0.21.4-green.svg" />
<img src="https://img.shields.io/badge/bodyparser-v1.19.0-green.svg" />
<img src="https://img.shields.io/badge/cors-v2.8.5-green.svg" /> <img src="https://img.shields.io/badge/dotenv-v8.2.0-green.svg" />
<img src="https://img.shields.io/badge/jsonwebtoken-v8.5.1-green.svg" /> <img src="https://img.shields.io/badge/multer-v1.4.2-green.svg" />
<img src="https://img.shields.io/badge/mysql2-v2.2.5-green.svg" />
<img src="https://img.shields.io/badge/nodemon-v2.0.4-green.svg" />

#### FrontEnd Framework

<img src="https://img.shields.io/badge/react-v17.0.2-green.svg" />

#### FrontEnd Library

<img src="https://img.shields.io/badge/tui_grid-v4.14.0-blue.svg" /> <img src="https://img.shields.io/badge/tui_pagination-v3.4.0-blue.svg" /> <img src="https://img.shields.io/badge/react_responsive_carousel-v3.2.21-blue.svg" /> <img src="https://img.shields.io/badge/react_draft_wysiwyg-v1.14.7-blue.svg" /> <img src="https://img.shields.io/badge/react_daum_postcode-v2.0.6-blue.svg" /> <img src="https://img.shields.io/badge/react_draft_wysiwyg-v1.14.7-blue.svg" /> <img src="https://img.shields.io/badge/axios-v0.21.1-blue.svg" /> <img src="https://img.shields.io/badge/iamport_payment-v1.1.8-blue.svg" />

## What is Tennis365?

Tennis365는 react와 nodejs를 활용한 간단한 테니스 라켓 쇼핑몰 사이트 입니다.
일반 사용자 페이지와 관리자 페이지로 나뉘어져 있으며 실제 쇼핑몰 사이트 처럼 구현을 했습니다.

### <span id='top'>바로가기</span>

- <a href="#erd">ERD 및 테이블 설명</span>
- <a href="#main-features">주요 기능</span>
<!-- - <a href="#screen">스크린샷</span> -->

## <span id="erd">ERD 및 테이블 설명</span>

![Tennis365_ERD](https://user-images.githubusercontent.com/79352105/135453243-93437b5f-9dc8-4b0a-b029-736c8e1102b8.png)

### 유저 테이블 (user)

```
1) name -> 사용자 이름
2) username -> 사용자 아이디
3) email -> 사용자 이메일
4) password -> 비밀번호(bcrypt로 암호화되어 삽입)
5) address1 -> 사용자 주소
6) address2 -> 상세 주소
7) isAdmin ->  일반 사용자 = 0, 관리자 = 1 (회원가입시 default 0)
```

### 상품 테이블(product)

```
1) product_name -> 상품명
2~11) 상품 정보
12) imgUrl -> 상품 커버 이미지 url
13) stock -> 재고
```

### 장바구니 테이블(cart)

```
1) user_id -> 장바구니의 귀속된 사용자 id (user 테이블과 매칭)
```

### 장바구니 상품 테이블(cart_item)

```
한 cart_id에 여러개의 product_id를 매칭 하도록 해서 장바구니에 여러 상품을 담는 기능을 구현

1) product_id -> 상품 id (product 테이블과 매핑)
2) cart_id -> 장바구니 id (cart 테이블과 매핑)
3) imgUrl -> 상품 커버 이미지 url
4) quantity -> 수량
```

### 리뷰 테이블(review)

```
1) review_body -> 리뷰 내용
2) username -> 댓글 작성자 아이디
3) createdAt -> 작성일
4) product_id -> 댓글이 포함된 상품 id
```

### 상품 이미지 테이블(images)

```
상품 상세 페이지에 나오는 이미지들
1) img_url -> 상품 이미지 url
2) product_id -> 이미지가 귀속된 상품 id
```

### 카테고리 테이블(category)

```
1) brand -> 브랜드 이름
    1. Babolat
    2. Wilson
    3. Head
    4. Yonex
    5. Dunlop
    6. TechniFibre

```

### 카테고리 상품 테이블(category_item)

```
category_id와 product_id를 매칭
1) catrgory_id -> 카테고리 id (category 테이블과 매핑)
2) product_id ->  상품 id (product 테이블과 매핑)
```

### 주문 테이블(orders)

```
1) createdAt -> 주문일자
2) grandTotal -> 결제 금액
3) user_id -> 주문자의 user_id (user 테이블과 매핑)
```

### 주문 상품 테이블(order_item)

```
1) order_id -> 주문 id (order 테이블과 매핑)
2) product_id -> 특정 주문에 귀속된 상품 id (product 테이블과 매핑)
3) quantity -> 수량
4) price -> 가격
5) product_name -> 상품명
6) stock -> 재고
7) imgUrl -> 상품 이미지 url
```

### 결제 테이블(transaction)

```
1) user_id -> 결제한 사람의 user_id (user 테이블과 매핑)
2) order_id -> 결제된 주문의 id (order 테이블과 매핑)
3) buyer_addr -> 구매자 주소
4) buyer_tel -> 구매자 전화번호
5) buyer_name -> 구매자 이름
6) pay_method -> 결제 방법
7) status -> 주문 상황
    0: 신규주문
    1: 발송대기
    2: 배송중
    3: 배송완료
8) merchant_uid -> 결제 고유 uid(아임포트 결제시 반환되는 uid)
9) name -> 상품명
10) amount -> 결제금액
```

### 게시판 테이블(message_board)

```
1) username -> 게시글 작성자 아이디
2) title -> 게시글 제목
3) body -> 게시글 내용
4) createdAt -> 게시글 작성일
5) board_category -> 게시판 카테고리
    0: 공지사항
    1: QnA
```

### 댓글 테이블(comment)

```
1) comment_body -> 댓글 내용
2) username -> 댓글 작성자 id
3) createdAt -> 댓글 작성일
4) createdAt -> 댓글 작성일
5) message_board_id -> 댓글이 귀속된 게시글 id (message_board 테이블과 매핑)
```

### <a href="#top">맨 위로</a>

## <span id="main-features">주요기능</span>

#### <span id="features">기능</span>

- <a href="">로그인 프로세스 </a>
- <a href="">회원가입 프로세스 </a> REACT DAUM POSTCODE(다음 우편찾기 라이브러리)]
- <a href="">장바구니에 담기 프로세스 </a>
- <a href="">주문하기 프로세스 </a> [REACT DAUM POSTCODE(다음 우편찾기 라이브러리)]
- <a href="">결제 프로세스 </a> [I'MPORT(아임포트 결제 API)]
- <a href="">관리자 -> 상품crud 프로세스 </a> [MULTER(파일업로드 라이브러리)]
- <a href="">관리자 -> 주문목록 프로세스</a> [TOAST GRID(그리드 라이브러리)]
- <a href="">관리자 -> 유저목록 프로세스 </a> [TOAST GRID(그리드 라이브러리)]
- <a href="">게시판 </a> [REACT DRAFT WYSIWYG(에디터 라이브러리)]
- <a href="">댓글, 답글 프로세스</a>
- <a href="">서버, 프론트 개발환경</a>
  [ MYSQL2(DB 라이브러리)]

#### <span id="library">Open Api 및 라이브러리 적용</span>

- <a href="https://www.iamport.kr/">IAMPORT(결제 API)</a>
- <a href="https://ui.toast.com/tui-grid/">TOAST GRID(그리드 라이브러리)</a>
- <a href="https://jpuri.github.io/react-draft-wysiwyg/#/">REACT DRAFT WYSIWYG(에디터 라이브러리)</a>
- <a href="https://www.npmjs.com/package/react-hooks-paginator">REACT HOOKS PAGINATOR(페이징 라이브러리)</a>
- <a href="http://postcode.map.daum.net/guide">REACT DAUM POSTCODE(다음 우편찾기 라이브러리)</a>
- <a href="https://www.npmjs.com/package/multer">MULTER(파일업로드 라이브러리)</a>
- <a href="https://www.npmjs.com/package/mysql2">MYSQL2(DB 라이브러리)</a>

### <a href="#top">맨 위로</a>
