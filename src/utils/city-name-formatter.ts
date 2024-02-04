// Função para formatar o nome das cidades
const formatCityName = (cityName: string): string => {
  const formattedName = cityName
    .replaceAll("-", " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  return formattedName;
};

export default formatCityName;
