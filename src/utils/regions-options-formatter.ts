// Função para formatar as opções de regiões
const formatRegionsOptions = (
  regions: { name: string; url: string }[]
): string[] => {
  return regions.map(
    (item) =>
      item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()
  );
};

export default formatRegionsOptions;
