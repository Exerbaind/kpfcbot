module.exports = {
    mainOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{ text: 'Продукт', callback_data: '/product' }, { text: 'Блюдо из ресторана', callback_data: '/food' }],
                [{ text: 'Добавить новый продукт', callback_data: '/addproduct' }, { text: 'Добавить новое блюдо', callback_data: '/addfood' }],
            ]
        })
    }
}