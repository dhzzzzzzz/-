# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制应用文件
COPY . .

# 构建Next.js应用
RUN npm run build

# 暴露端口
EXPOSE 9000

# 启动应用
CMD ["npm", "start"]

