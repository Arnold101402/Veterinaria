//Tipos proporcionados por Express, 
import type { RequestHandler } from "express";

//Extrae automaticamente los parámetros de un controlador de Express - eq, res, next

type FuncionAsincrona = (
  ...argumentos: Parameters<RequestHandler>
  //...argumentos recibe los parametros como una lista 
) => Promise<void>;// una funcion asincrona q no nececita devolver un valor

//recibe un controlador asincrono y devuelve un controlador compatible con express

export const asyncHandler = (
  funcion: FuncionAsincrona,
): RequestHandler => (req, res, next) => {
  void funcion(req, res, next).catch(next);//ejecuta el controlador
  //si ocurre un error lo captura catch
};