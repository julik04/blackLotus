# Используем официальный образ Node.js (LTS-версия)
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json (или yarn.lock)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .


# Указываем порт, который будет использоваться
EXPOSE 3000

# Команда для запуска приложения (зависит от проекта)
CMD ["npm", "run","start"]