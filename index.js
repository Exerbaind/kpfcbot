const TelegramBot = require('node-telegram-bot-api');

const { mainOptions } = require('./options');

const token = '5125173027:AAFqYLRs58JzJBMoxBCn_hMvm_3O8X8ifoM';
const mongoDBToken = 'mongodb+srv://Exerbaind:Bot354040126Telegram@cluster0.yw7xw.mongodb.net/Data?retryWrites=true&w=majority'

const bot = new TelegramBot(token, { polling: true });

const start = () => {

    bot.setMyCommands([
        { command: '/product', description: 'Продукт' },
        { command: '/food', description: 'Блюдо из ресторана' },
        { command: '/addproduct', description: 'Добавить продукт' },
        { command: '/addfood', description: 'Добавить блюдо' },
    ])

    const data = [
        {
            name: 'Яблоко',
            kal: 200,
            prot: 20,
            carb: 50
        },
    ];

    bot.on('message', async (message) => {
        const { chat: { id }, text } = message;
    
        if (text === '/start') {
            return bot.sendMessage(id, 'Выбери, что тебе интересно!', mainOptions);
        }

        const product = data.find((item) => item.name.toLocaleLowerCase() === text.toLocaleLowerCase());

        if (product) {
            const { name, kal, prot, carb } = product;
            return bot.sendMessage(id, `О продукте ${name}. Калорий: ${kal}, Белка: ${prot}, Углеводов: ${carb}`);
        }

        return bot.sendMessage(id, `К сожалению, такой продукт не найден. Вы можете информацию о нем в пункте "Добавить новый продукт"`);
    });

    bot.on('callback_query', async (message) => {
        const { message: { chat: { id } }, data } = message;

        if (data === '/product') {
            return bot.sendMessage(id, `Вы выбрали категорию продукты. Впишите название продукта, по которому хотите получить информацию.`);
        }
    
        if (data === '/food') {
            return bot.sendMessage(id, `Вы выбрали категорию блюда из ресторана. Впишите название блюда, по которому хотите получить информацию.`);
        }
    })
};

start();
