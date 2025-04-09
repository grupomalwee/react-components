export function roundToNextInterval(date, interval) {
    // Obtém os minutos da data
    const minutes = date.getMinutes();
    // Calcula quantos minutos faltam para o próximo múltiplo do intervalo
    const remainder = interval - (minutes % interval);
    // Cria uma nova data ajustada para o próximo múltiplo do intervalo
    const roundedDate = new Date(date);
    roundedDate.setMinutes(minutes + remainder);
    // Ajusta os segundos e milissegundos para zero
    roundedDate.setSeconds(0);
    roundedDate.setMilliseconds(0);
    return roundedDate;
}
