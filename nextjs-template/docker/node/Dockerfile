# ベースイメージ
FROM node:latest

# 作業ディレクトリ作成
WORKDIR /app

# 依存ファイルのコピー
COPY package*.json ./

# 依存のインストール
RUN npm install

# アプリケーションコードのコピー
COPY . .


# アプリ起動
CMD ["npm", "run", "dev"]