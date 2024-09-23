import mongoose from "mongoose";

const carteiraSchema = new mongoose.Schema({});

const carteiraAtualSchema = new mongoose.Schema({}); 

const performanceCarteiraSchema = new mongoose.Schema({}); 

const carteiraAtual = mongoose.model('CarteiraAtual', carteiraAtualSchema);
const performanceCarteira = mongoose.model('PerformanceCarteira', performanceCarteiraSchema);

export {carteiraAtual, performanceCarteira};