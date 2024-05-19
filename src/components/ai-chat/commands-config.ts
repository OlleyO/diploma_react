class VoiceRecognitionService {
  get commandsConfig() {
    return {
      "переглянути статистику": {
        message:
          "Щоб переглянути статистику, перейдіть на деталі товару. Праворуч від інформації про товар. Буде історія продажу/купівлі у вигляді графіку гістограми. Дані можна переглянути за поточний рік.",
      },
      "перейти на всі": {
        message: "Зараз я переведу Вас на сторінку всіх товарів. Зачекайте...",
        handler: () => {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent("navigate", { detail: { to: "all" } }),
            );
          }, 1000);
        },
      },
      "переглянути телефони": {
        message:
          "Зараз я переведу Вас на сторінку всіх телефонів. Зачекайте...",
        handler: () => {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent("navigate", { detail: { to: "phones" } }),
            );
          }, 1000);
        },
      },
      "перейти на ноутбуки": {
        message:
          "Зараз я переведу Вас на сторінку всіх ноутбуків. Зачекайте...",
        handler: () => {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent("navigate", { detail: { to: "laptops" } }),
            );
          }, 1000);
        },
      },
      "перейти на аксесуари": {
        message:
          "Зараз я переведу Вас на сторінку всіх аксесуарів. Зачекайте...",
        handler: () => {
          setTimeout(() => {
            document.dispatchEvent(
              new CustomEvent("navigate", { detail: { to: "accessories" } }),
            );
          }, 1000);
        },
      },
      "як закупити товар": {
        message:
          "На деталях товару натисніть Закупити. Після цього Вам треба вибрати Постачальника, який Вас цікавить, кількість товару та склад. Після успішної купівлі Ви побачите відповідне повідомлення.",
      },
      "як продати товар": {
        message:
          "На деталях товару натисніть Продати. Після цього Вам треба ввести кількість товару. Після успішного продажу Ви побачите відповідне повідомлення.",
      },
      дякую: {
        message: "Прошу. Звертайтесь, буду радий допомогти.",
      },
      привіт: {
        message: "Привіт! Чим можу допомогти?",
      },
      error: {
        message: "Вибачте, не можу обробити Ваш запит.",
      },
    };
  }
}

export const voiceRecognitionService = new VoiceRecognitionService();