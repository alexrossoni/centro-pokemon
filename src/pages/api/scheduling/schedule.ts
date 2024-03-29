import { NextApiRequest, NextApiResponse } from "next";

/* Endpoint criado para simular o envio do formulário */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Simulando o processamento e geração de um ID
    const id = Math.floor(Math.random() * 1000) + 1;

    const {
      name,
      surname,
      region,
      city,
      pokemonsValues,
      date,
      time,
      quantity,
      price,
      tax,
    } = req.body;

    if (
      typeof name !== "string" ||
      typeof surname !== "string" ||
      typeof region !== "string" ||
      typeof city !== "string" ||
      !Array.isArray(pokemonsValues) ||
      !pokemonsValues.every((pokemon) => typeof pokemon.name === "string") ||
      !pokemonsValues.every(
        (pokemon) => typeof pokemon.generation === "number"
      ) ||
      typeof date !== "string" ||
      typeof time !== "string" ||
      typeof quantity !== "number" ||
      typeof price !== "number" ||
      typeof tax !== "number"
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Tipos de dados inválidos." });
    }

    let message: string = `Seu agendamento para dia ${date}, às ${time}, para ${quantity} pokémon(s) foi realizado com sucesso!`;
    // Retornando o objeto com o ID gerado e a propriedade success
    const response = {
      data: { ...req.body, id },
      success: true,
      message: message,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Erro ao agendar consulta:", error);
    res
      .status(500)
      .json({ success: false, message: "Erro interno ao agendar consulta." });
  }
}
