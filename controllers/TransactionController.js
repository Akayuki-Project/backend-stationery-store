const Transaction = require("../models/Transaction");
const midtransClient = require("midtrans-client");

exports.createTransaction = async (req, res) => {
  try {
    const { first_name, amount, product_id } = req.body;

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
        finish: `${process.env.CLIENT_URL}/success-payment/${product_id}`,
      },
    };

    // Dapatkan Snap Token, bukan URL
    const transaction = await snap.createTransaction(parameter);
    const snapToken = transaction.token;

    // Simpan ke database
    const newTransaction = new Transaction({
      ...req.body,
      transaction_id: order_id,
      midtrans_url: snapToken, // simpan snap_token
    });

    await newTransaction.save();

    // Kirim response ke frontend
    res.status(201).json({
      message: "Transaksi berhasil dibuat",
      snap_token: snapToken,
      transaction_id: order_id,
    });
  } catch (err) {
    console.error("Gagal membuat transaksi:", err);
    res.status(400).json({ message: err.message });
  }
};
