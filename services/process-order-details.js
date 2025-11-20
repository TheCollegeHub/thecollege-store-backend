import axios from 'axios';
import { Order } from '../models/order';

export async function processOrderMessage(orderNumber) {
  try {
    const order = await Order.findOne({ orderNumber: orderNumber });

    if (!order) {
      throw new Error(`Order with number ${orderNumber} not found`);
    }

    const cartItem = order.cartItems[0];
    const productIds = Object.keys(cartItem).filter(key => cartItem[key] > 0)
    const { data: products } = await axios.post('http://localhost:5002/api/products', { ids: productIds });
    console.log(products)
    const response = await axios.get(`http://localhost:5001/api/user/${order.userId}`);
    const userData = response.data.data;
    console.log(userData)

    const orderHtml = generateOrderHtml(order, products, userData.name, userData.email);

    const orderMessage = {
      title: `Invoice sent for order ${order.orderNumber}`,
      subject: `Your Invoice #${order.orderNumber}`,
      content: orderHtml,
      username: userData.name,
      emailTo: userData.email
    };

    return orderMessage;

  } catch (error) {
    console.error(`Erro to process message for order ${orderNumber}:`, error);
  }
}

function generateOrderHtml(order, products, username, email) {
  const orderHtml = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fatura da Ordem</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: auto;
                background: #ffffff;
                border-radius: 8px;
                box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                padding: 20px;
            }
            h1 {
                color: #333;
                text-align: center;
            }
            .section {
                margin-bottom: 20px;
                padding: 10px;
                border: 1px solid #e0e0e0;
                border-radius: 5px;
                background-color: #f9f9f9;
            }
            .section h2 {
                font-size: 18px;
                color: #444;
            }
            .section p {
                margin: 5px 0;
                color: #666;
            }
            .total {
                font-weight: bold;
                font-size: 20px;
                color: #28a745;
            }
            .footer {
                text-align: center;
                margin-top: 20px;
                font-size: 14px;
                color: #aaa;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Fatura da Ordem</h1>
            <div class="section">
                <h2>Detalhes da Ordem</h2>
                <p><strong>Número da Ordem:</strong> ${order.orderNumber}</p>
                <p><strong>Data:</strong> ${new Date(order.date).toLocaleDateString('pt-BR')}</p>
                <p><strong>Nome do Cliente:</strong> ${username}</p>
                <p><strong>Email:</strong> ${email}</p>
            </div>
            <div class="section">
                <h2>Itens do Carrinho</h2>
                <ul>
                ${Object.entries(order.cartItems[0])
                    .filter(([id, quantity]) => quantity > 0) // Filtra onde a quantidade é maior que zero
                    .map(([id, quantity]) => {
                        const product = products.find(p => p.id === Number(id)); // Converte o id para número
                        return product ? `<li>${product.name} - Quantidade: ${quantity}</li>` : '';
                    }).join('')}
                </ul>
            </div>
            <div class="section">
                <h2>Total da Ordem</h2>
                <p><span class="total">R$ ${order.finalAmount.toFixed(2)}</span></p>
                <p><strong>Endereço de entrega:</strong> ${order.address.street}, ${order.address.city}</p>
            </div>
            <div class="footer">
                <p>Obrigado por comprar conosco!</p>
            </div>
        </div>
    </body>
    </html>
  `;
  return orderHtml;
}
