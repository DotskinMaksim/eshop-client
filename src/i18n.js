// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'et', // язык по умолчанию
    debug: true,
    resources: {
        en: {
            translation: {
                "app_name": "DotShop - Welcome!",
                "home": "Home",
                "cart": "Cart",
                "my_orders": "My Orders",
                "log_out": "Log out",
                "log_in": "Log in",
                "register": "Register",
                "add_to_cart": "Add to cart",
                "added_to_cart": "Added to cart",
                "price": "Price",
                "amount": "Amount",
                "delete": "Delete",
                "total_amount": "Total amount",
                "order": "Order",
                "log_in_to_make_an_order": "Log in to make an order",
                "by": "by",
                "total_cost": "Total cost",
                "products": "Products",
                "pcs": "pcs",
                "kg": "kg",
                "cart_is_empty": "Cart is empty",
                "processing_payment": "Processing payment",
                "cancel_payment": "Cancel payment",
                "payment_successful": "Payment successful",
                "order_created": "Order created",
                "go_to_home": "Go to home",
                "payment_canceled": "Payment canceled",
                "loading": "Loading",
                "you_have_no_orders": "You have no orders",
                "this_order_does_not_include_products": "This order does not include products",
                "make_an_order": "Make an order",
                "login": "Login",
                "password": "Password",
                "confirm_password": "Confirm Password",
                "email": "Email",
                "the_product_cannot_be_added_to_the_cart": "The product cannot be added to the cart",
                "only_left_in_stock": "Only left in stock",
                "you_cannot_set_a_quantity_greater_than_the_available_quantity": "You cannot set a quantity greater than the available quantity",

            }
        },
        et: {
            translation: {
                "app_name": "DotShop - Tere tulemast!",
                "home": "Avaleht",
                "cart": "Ostukorv",
                "my_orders": "Minu tellimused",
                "log_out": "Logi välja",
                "log_in": "Logi sisse",
                "register": "Registreeru",
                "add_to_cart": "Lisa ostukorvi",
                "added_to_cart": "Lisatud ostukorvi",
                "price": "Hind",
                "amount": "Kogus",
                "delete": "Kustuta",
                "total_amount": "Kogusumma",
                "order": "Tellimus",
                "log_in_to_make_an_order": "Logige sisse, et tellida",
                "by": "kuupäevaga",
                "total_cost": "Kogumaksumus",
                "products": "Tooted",
                "pcs": "tk",
                "kg": "kg",
                "cart_is_empty": "Ostukorv on tühi",
                "processing_payment": "Makse töötlemine",
                "cancel_payment": "Tühista makse",
                "payment_successful": "Makse õnnestus",
                "order_created": "Tellimus loodud",
                "go_to_home": "Avalehele",
                "payment_canceled": "Makse tühistatud",
                "loading": "Laadimine",
                "you_have_no_orders": "Teil pole tellimusi",
                "this_order_does_not_include_products": "See tellimus ei sisalda tooteid",
                "make_an_order": "Telli",
                "login": "Kasutajanimi",
                "password": "Parool",
                "confirm_password": "Kinnita parool",
                "email": "E-post",
                "the_product_cannot_be_added_to_the_cart": "Toodet ei saa ostukorvi lisada",
                "only_left_in_stock": "Ainult laost jäänud",
                "you_cannot_set_a_quantity_greater_than_the_available_quantity": "Te ei saa määrata saadaolevast kogusest suuremat kogust",

                }
            },
        ru: {
            translation: {
                "app_name": "DotShop - Добро пожаловать!",
                "home": "Главная",
                "cart": "Корзина",
                "my_orders": "Мои заказы",
                "log_out": "Выйти",
                "log_in": "Войти",
                "register": "Зарегистрироваться",
                "add_to_cart": "Добавить в корзину",
                "added_to_cart": "Добавлено в корзину",
                "price": "Цена",
                "amount": "Количество",
                "delete": "Удалить",
                "total_amount": "Всего",
                "order": "Заказ",
                "log_in_to_make_an_order": "Войдите, чтобы оформить заказ",
                "by": "за",
                "total_cost": "Общая стоимость",
                "products": "Товары",
                "pcs": "шт",
                "kg": "кг",
                "cart_is_empty": "Корзина пуста",
                "processing_payment": "Обработка платежа",
                "cancel_payment": "Отменить платеж",
                "payment_successful": "Платеж прошел успешно",
                "order_created": "Заказ оформлен",
                "go_to_home": "На главную",
                "payment_canceled": "Платеж отменен",
                "loading": "Загрузка",
                "you_have_no_orders": "У вас нет заказов",
                "this_order_does_not_include_products": "В этот заказ не входят товары",
                "make_an_order": "Оформить заказ",
                "login": "Имя пользователя",
                "password": "Пароль",
                "confirm_password": "Подтвердите пароль",
                "email": "Э-почта",
                "the_product_cannot_be_added_to_the_cart": "Товар не может быть добавлен в корзину",
                "only_left_in_stock": "В наличии осталось только",
                "you_cannot_set_a_quantity_greater_than_the_available_quantity": "Вы не можете установить количество больше доступного количества",
}
      },
      // добавьте другие языки здесь
    },
    // если хотите загружать переводы с сервера
    // backend: {
    //   loadPath: '/locales/{{lng}}/{{ns}}.json',
    // },
    interpolation: {
      escapeValue: false // not needed for React as it escapes by default
    }
  });

export default i18n;