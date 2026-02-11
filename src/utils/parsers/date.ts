import dayjs from "dayjs";

export const parseDate = (date: dayjs.Dayjs): string => {
  const dia: number = date.date(); // Utiliza `date()` en lugar de `getDate()`
  const mes: number = date.month() + 1; // Utiliza `month()` en lugar de `getMonth()` (Nota: `month()` devuelve 0-11)
  const anio: number = date.year(); // Utiliza `year()` en lugar de `getFullYear()`

  const diaFormateado: string = dia < 10 ? `0${dia}` : dia.toString();
  const mesFormateado: string = mes < 10 ? `0${mes}` : mes.toString();

  //Agregar los datos de la hora, minutos y segundos en zeros

  const hora: number = date.hour();
  const minuto: number = date.minute();
  const segundo: number = date.second();

  const horaFormateada: string = hora < 10 ? `0${hora}` : hora.toString();
  const minutoFormateado: string =
    minuto < 10 ? `0${minuto}` : minuto.toString();
  const segundoFormateado: string =
    segundo < 10 ? `0${segundo}` : segundo.toString();
  // return `${anio}/${mesFormateado}/${diaFormateado}`;

  return `${anio}/${mesFormateado}/${diaFormateado} ${horaFormateada}:${minutoFormateado}:${segundoFormateado}`;
};
