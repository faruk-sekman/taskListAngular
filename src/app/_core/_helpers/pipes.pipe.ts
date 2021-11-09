import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDates'
})
class FormatDates implements PipeTransform {
  transform(value:any, type: any): any {

    if (!value || !type) {
      return value;
    }

    let turkishMonths: string[] = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık']
      , shortMonths: string[] = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']


    let types = {
      period: function () {
        let m = value.substr(4);
        return turkishMonths[m - 1] + ' ' + value.substr(0, 4);
      },
      full: function () {
        let date = new Date(value);
        return date.getDate() + ' ' + turkishMonths[date.getMonth()] + ' ' + date.getFullYear();
      },
      periodMM: function () {
        let m = value.substr(4)
          , dateName = shortMonths[m - 1];
        return dateName;
      },
      periodDM: function () {
        let m = value.substr(3);
        return value.substr(0, 2) + ' ' + turkishMonths[m - 1];
      }
    };

    // @ts-ignore
    return types[type].apply();

  }
}

export { FormatDates };
