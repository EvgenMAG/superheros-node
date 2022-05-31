Домашнее задание 4


Создана REST API для работы с коллекцией контактов. Добавлена логика аутентификации/авторизации пользователя с помощью JWT.

Шаг 1

В коде создана схема и модель пользователя для коллекции users.

{
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
}
Каждый пользователь работает и видет только свои контакты в схеме контактов owner

    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    }
Примечание: 'user' - название модели пользователя

Шаг 2

Регистрация

Создан эндпоинт /users/signup

Сделана валидация всех обязательных полей (email и password). При ошибке валидации возвращается Ошибка валидации.

В случае успешной валидации в модели User создается пользователь по данным которые прошли валидацию. Для засолки паролей используется bcrypt или bcryptjs

Если почта уже используется кем-то другим, возвращается Ошибка Conflict.
В противном случае возвращается Успешный ответ.
Registration request

POST /users/signup
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
Registration validation error

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi>
Registration conflict error

Status: 409 Conflict
Content-Type: application/json
ResponseBody: {
  "message": "Email in use"
}
Registration success response

Status: 201 Created
Content-Type: application/json
ResponseBody: {
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
Логин

Создан эндпоинт /users/login

В модели User находим пользователя по email.

Сделана валидация всех обязательных полей (email и password). При ошибке валидации возвращается Ошибка валидации.

В противном случае, сравнить пароль для найденного юзера, если пароли совпадают создать токен, сохранить в текущем юзере и вернуть Успешный ответ.
Если пароль или email неверный, вернуть Ошибку Unauthorized.
Login request

POST /users/login
Content-Type: application/json
RequestBody: {
  "email": "example@example.com",
  "password": "examplepassword"
}
Login validation error

Status: 400 Bad Request
Content-Type: application/json
ResponseBody: <Ошибка от Joi или другой библиотеки  валидации>
Login success response

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "token": "exampletoken",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
Login auth error

Status: 401 Unauthorized
ResponseBody: {
  "message": "Email or password is wrong"
}
Шаг 3

Проверка токена

Создайте мидлвар для проверки токена и добавь его ко всем маршрутам, которые должны быть защищены.

Мидлвар берет токен из заголовков Authorization, проверяет токен на валидность.
В случае ошибки вернуть Ошибку Unauthorized.
Если валидация прошла успешно, получить из токена id пользователя. Найти пользователя в базе данных по этому id.
Если пользователь существует и токен совпадает с тем, что находится в базе, записать его данные в req.user и вызвать методnext().
Если пользователя с таким id не существует или токены не совпадают, вернуть Ошибку Unauthorized
Middleware unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Шаг 4

Логаут

Создайте ендпоинт /users/logout

Добавьте в маршрут мидлвар проверки токена.

В модели User найти пользователя по _id.
Если пользователя не существует вернуть Ошибку Unauthorized.
В противном случае, удалить токен в текущем юзере и вернуть Успешный ответ.
Logout request

POST /users/logout
Authorization: "Bearer {{token}}"
Logout unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Logout success response

Status: 204 No Content
Шаг 5

Текущий пользователь - получить данные юзера по токену

Создайте эндпоинт /users/current

Добавьте в маршрут мидлвар проверки токена.

Если пользователя не существует вернуть Ошибку Unauthorized
В противном случае вернуть Успешный ответ
Current user request

GET /users/current
Authorization: "Bearer {{token}}"
Current user unauthorized error

Status: 401 Unauthorized
Content-Type: application/json
ResponseBody: {
  "message": "Not authorized"
}
Current user success response

Status: 200 OK
Content-Type: application/json
ResponseBody: {
  "email": "example@example.com",
  "subscription": "starter"
}
Дополнительное задание - необязательное

Сделана пагинация с mongoose-paginate-v2 для коллекции контактов (GET /contacts?page=1&limit=3).
Сделана фильтрация контактов по полю избранного (GET /contacts?favorite=true)
Обновление подписки (subscription) пользователя через эндпоинт PATCH /users. Подписка должна иметь одно из следующих значений ['starter', 'pro', 'business']