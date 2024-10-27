import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const cnpj = searchParams.get("cnpj")?.replace(/[^\d]+/g, ""); // Limpa o CNPJ

  if (!cnpj) {
    return NextResponse.json({ error: "CNPJ não fornecido" }, { status: 400 });
  }

  const apiKey = "e4bb251adf29a9eec3f26ce9716b8a3e"; // Substitua pela sua chave da API
  const url = `https://api.portaldatransparencia.gov.br/api-de-dados/cepim?cnpj=${cnpj}`;

  try {
    console.log(`CNPJ: ${cnpj}`);
    console.log(`URL da requisição: ${url}`);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "chave-api-dados": apiKey,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Erro ao buscar dados da API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data); // Retorna os dados como JSON
  } catch (error) {
    console.error("Erro:", error);
    return NextResponse.json(
      { error: "Erro ao processar a requisição" },
      { status: 500 }
    );
  }
}
