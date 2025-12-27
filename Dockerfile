# 使用官方Node.js运行时作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json（如果存在）
COPY package*.json ./

# 安装依赖（包括devDependencies，构建时需要）
RUN npm install

# 复制所有应用文件（.dockerignore会排除不需要的文件）
COPY . .

# 构建Next.js应用
RUN npm run build

# 暴露端口
EXPOSE 9000

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=9000

# 启动应用
CMD ["npm", "start"]

