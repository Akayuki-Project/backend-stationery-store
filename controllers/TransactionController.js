const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");

exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id } = req.body;

    // Membuat instance Snap Midtrans
    const snap = new midtransClient.Snap({
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    const order_id = "ORDER-" + new Date().getTime();

    const parameter = {
      transaction_details: {
        order_id: order_id,
        gross_amount: amount,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: first_name,
      },
      callbacks: {
        finish: `http://localhost:5173/success-payment/${product_id}`,
      },
    };

    // Buat transaksi dan dapatkan URL pembayaran Midtrans
    const transaction = await snap.createTransaction(parameter);
    const transactionUrl = transaction.redirect_url;

    // Simpan transaksi ke database
    const newTransaction = new Transaction({
      ...req.body,
      transaction_id: order_id,
      midtrans_url: transactionUrl,
    });

    await newTransaction.save();

    // Kirim response ke frontend
    res.status(201).json(newTransaction);
  } catch (err) {
    console.error("Gagal membuat transaksi:", err);
    res.status(400).json({ message: err.message });
  }
};
