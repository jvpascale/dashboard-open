import mongoose from "mongoose";
import "dotenv/config";

const INTERVALO_RECO = 5000;
let conexaoFeita = false; 

const connectDB = async () => {
  if (conexaoFeita) {
    console.log("Conexão já estabelecida!");
    return;
  }

  try {
      await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        socketTimeoutMS: 45000, 
        connectTimeoutMS: 30000, 
      });
      console.log('MongoDB conectado com sucesso!');
      conexaoFeita = true;
  } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      conexaoFeita = false;
      setTimeout(connectDB, INTERVALO_RECO);
  }
};

mongoose.connection.on('connected', () => {
  conexaoFeita = true;
  console.log('Mongoose conectado.');
});

mongoose.connection.on('error', (err) => {
  console.error('Erro na conexão com o MongoDB:', err);
  conexaoFeita = false;
  setTimeout(connectDB, INTERVALO_RECO);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose desconectado.');
  conexaoFeita = false;
  setTimeout(connectDB, INTERVALO_RECO);
});


export default connectDB; 