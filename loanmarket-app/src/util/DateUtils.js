import Picker from "react-native-picker/index";
import area from './area.json';

export default class DateUtils {
  static DATETIME = 1;
  static DATE = 2;
  static TIME = 3;
  static MONTH = 4;
  static YEAR = 5;
  static DATEONE = 6;
  static YEARONE = 7;
  static MONTHONE = 8;
  static JUSTYEAR = 9;


  /**
   * 获取时间 2018-11-11 11:11
   */
  static getDateTime(type) {
    let date = new Date();
    let div = "-";
    let div1 = ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds(); //秒
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    if (type === DateUtils.DATETIME) {//2018-11-11 11:11
      return year + div + month + div + strDate + " " + hour + div1 + minutes;
    } else if (type === DateUtils.DATE) {//2018-11-11
      return year + div + month + div + strDate;
    } else if (type === DateUtils.DATEONE) {//2018-11-01
      return year + div + month + div + '01';
    } else if (type === DateUtils.YEARONE) {//2018-11-01
      return year + div + '01' + div + '01';
    } else if (type === DateUtils.TIME) {//11:11
      return hour + div1 + minutes;
    } else if (type === DateUtils.MONTH) {
      return month + div + strDate;
    } else if (type === DateUtils.MONTHONE) {
      return month + div + '01';
    }

  }
  /**
   * 获取时间 2018-11-11 11:11
   */
  static getSpecialDateTime(type, time) {
    let nowDate = new Date();
    let specialTime = nowDate.getTime() + time;
    let date = new Date(specialTime);
    let div = "-";
    let div1 = ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds(); //秒
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    if (type === DateUtils.DATETIME) {//2018-11-11 11:11
      return year + div + month + div + strDate + " " + hour + div1 + minutes;
    } else if (type === DateUtils.DATE) {//2018-11-11
      return year + div + month + div + strDate;
    } else if (type === DateUtils.TIME) {//11:11
      return hour + div1 + minutes;
    } else if (type === DateUtils.MONTH) {
      return month + div + strDate;
    }
  }

  /**
     * 获取时间 2018-11-11 11:11
     */
  static getDate(type) {
    let date = new Date();
    let div = "";
    let div1 = ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds(); //秒
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    if (type === DateUtils.DATETIME) {//2018-11-11 11:11
      return year + div + month + div + strDate + " " + hour + div1 + minutes;
    } else if (type === DateUtils.DATE) {//2018-11-11
      return year + div + month + div + strDate;
    } else if (type === DateUtils.TIME) {//11:11
      return hour + div1 + minutes;
    } else if (type === DateUtils.MONTH) {
      return month + div + strDate;
    } else if (type === DateUtils.MONTHONE) {
      return month + div + '01';
    } else if (type === DateUtils.YEAR) {
      return year + div + month;
    } else if (type === DateUtils.JUSTYEAR) {
      return year;
    }
  }


  static showDate(onPickerConfirm, onPickerCancel) {
    let months = [],
      days = [];


    for (let i = 1; i < 13; i++) {
      let text = i < 10 ? ('0' + i) : i;
      months.push(text);
    }
    for (let i = 1; i < 32; i++) {
      let text = i < 10 ? ('0' + i) : i;
      days.push(text);
    }

    let pickerData = [months, days];
    let date = new Date();
    let selectedValue = [
      date.getMonth() + 1,
      date.getDate(),
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择日期',
      wheelFlex: [1, 1],
      onPickerConfirm: pickedValue => {
        console.log('area', pickedValue);
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0] + "-" + pickedValue[1]);
        }
      },
      onPickerCancel: pickedValue => {
        console.log('area', pickedValue);
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        console.log(pickedValue);
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  static showDateAndYear(onPickerConfirm, onPickerCancel) {
    let years = [], months = [],
      days = [];

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }
    for (let i = 1; i < 13; i++) {
      let text = i < 10 ? ('0' + i) : i;
      months.push(text);
    }
    for (let i = 1; i < 32; i++) {
      let text = i < 10 ? ('0' + i) : i;
      days.push(text);
    }

    let pickerData = [years, months, days];
    let date = new Date();
    let selectedValue = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择日期',
      // pickerConfirmBtnColor: [1, 186, 245, 1],
      // pickerToolBarBg: [12, 25, 46, 1],
      // pickerBg: [8, 32, 60, 1],
      // pickerConfirmBtnColor: [57, 137, 249, 1],
      // pickerCancelBtnColor: [184, 193, 200, 1],
      // pickerTitleColor: [1, 186, 245, 1],
      // pickerFontColor: [57, 137, 249, 1],
      wheelFlex: [3, 2, 3],
      onPickerConfirm: pickedValue => {
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0], pickedValue[1], pickedValue[2]);
        }
      },
      onPickerCancel: pickedValue => {
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  static showMonthAndYear(onPickerConfirm, onPickerCancel) {
    let years = [], months = [];

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }
    for (let i = 1; i < 13; i++) {
      let text = i < 10 ? ('0' + i) : i;
      months.push(text);
    }


    let pickerData = [years, months];
    let date = new Date();
    let selectedValue = [
      date.getFullYear(),
      date.getMonth() + 1,
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      pickerConfirmBtnColor: [1, 186, 245, 1],
      pickerToolBarBg: [12, 25, 46, 1],
      pickerBg: [8, 32, 60, 1],
      pickerConfirmBtnColor: [57, 137, 249, 1],
      pickerCancelBtnColor: [184, 193, 200, 1],
      pickerTitleColor: [1, 186, 245, 1],
      pickerFontColor: [57, 137, 249, 1],
      wheelFlex: [1, 1],
      onPickerConfirm: pickedValue => {
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0], pickedValue[1]);
        }
      },
      onPickerCancel: pickedValue => {
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  static showYear(onPickerConfirm, onPickerCancel) {
    let years = [];
    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }

    let pickerData = [years];
    let date = new Date();
    let selectedValue = [
      date.getFullYear(),
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '',
      pickerConfirmBtnColor: [1, 186, 245, 1],
      pickerToolBarBg: [12, 25, 46, 1],
      pickerBg: [8, 32, 60, 1],
      pickerConfirmBtnColor: [57, 137, 249, 1],
      pickerCancelBtnColor: [184, 193, 200, 1],
      pickerTitleColor: [1, 186, 245, 1],
      pickerFontColor: [57, 137, 249, 1],
      wheelFlex: [1],
      onPickerConfirm: pickedValue => {
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0]);
        }
      },
      onPickerCancel: pickedValue => {
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 1) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  static showDateTime(onPickerConfirm, onPickerCancel) {
    let years = [],
      months = [],
      days = [],
      hours = [],
      minutes = [];

    for (let i = 1; i < 51; i++) {
      years.push(i + 1980);
    }
    for (let i = 1; i < 13; i++) {
      let text = i < 10 ? ('0' + i) : i;
      months.push(text);
    }
    for (let i = 1; i < 32; i++) {
      let text = i < 10 ? ('0' + i) : i;
      days.push(text);
    }
    for (let i = 0; i < 24; i++) {
      let text = i < 10 ? ('0' + i) : i;
      hours.push(text);
    }
    for (let i = 0; i < 60; i++) {
      let text = i < 10 ? ('0' + i) : i;
      minutes.push(text);
    }
    let pickerData = [years, months, days, hours, minutes];
    let date = new Date();
    let selectedValue = [
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate(),
      date.getHours(),
      date.getMinutes()
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: '选择日期',
      wheelFlex: [2, 1, 1, 2, 1, 1],
      onPickerConfirm: pickedValue => {
        console.log('area', pickedValue);
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0] + "-" + pickedValue[1] + "-" + pickedValue[2] + " " + pickedValue[3] + ":" + pickedValue[4]);
        }
      },
      onPickerCancel: pickedValue => {
        console.log('area', pickedValue);
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        console.log(pickedValue);
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }

  static showPicker(title, data, onPickerConfirm, onPickerCancel) {

    let pickerData = [data];
    let date = new Date();
    let selectedValue = [
      date[0],
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: title,
      pickerConfirmBtnColor: [1, 186, 245, 1],
      pickerToolBarBg: [12, 25, 46, 1],
      pickerBg: [8, 32, 60, 1],
      pickerConfirmBtnColor: [57, 137, 249, 1],
      pickerCancelBtnColor: [184, 193, 200, 1],
      pickerTitleColor: [192, 227, 255, 1],
      pickerFontColor: [57, 137, 249, 1],
      wheelFlex: [2],
      onPickerConfirm: pickedValue => {
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0]);
        }
      },
      onPickerCancel: pickedValue => {
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        console.log(pickedValue);
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }
  static showPickerCity(onPickerConfirm, onPickerCancel) {

    let pickerData = this._createAreaData();
    let selectedValue = [
      ['四川', '成都'],
    ];
    Picker.init({
      pickerData,
      selectedValue,
      pickerConfirmBtnText: '确认',
      pickerCancelBtnText: '取消',
      pickerTitleText: "选择城市",
      wheelFlex: [1, 1],
      onPickerConfirm: pickedValue => {
        if (onPickerConfirm) {
          onPickerConfirm(pickedValue[0], pickedValue[1]);
        }
      },
      onPickerCancel: pickedValue => {
        if (onPickerCancel) {
          onPickerCancel(pickedValue);
        }
      },
      onPickerSelect: pickedValue => {
        console.log(pickedValue);
        let targetValue = [...pickedValue];
        if (JSON.stringify(targetValue) !== JSON.stringify(pickedValue)) {
          // android will return String all the time，but we put Number into picker at first
          // so we need to convert them to Number again
          targetValue.map((v, k) => {
            if (k !== 3) {
              targetValue[k] = parseInt(v);
            }
          });

          Picker.select(targetValue);
          // pickedValue = targetValue;
        }
      }
    });
    Picker.show();
  }
  static _createAreaData() {
    let data = [];
    let len = area.length;
    for (let i = 0; i < len; i++) {
      let city = [];
      for (let j = 0, cityLen = area[i]['city'].length; j < cityLen; j++) {
        // let _city = {};
        // _city[area[i]['city'][j]['name']] = area[i]['city'][j]['area'];
        // city.push(_city);
        city.push(area[i]['city'][j]['name']);
      }

      let _data = {};
      _data[area[i]['name']] = city;
      data.push(_data);
    }
    return data;
  }
  static getTimeString(nowTime, lastTime) {
    let timeNow = (new Date(Date.parse(nowTime.replace(/-/g, "/")))).getTime() / 1000;
    let timeLast = (new Date(Date.parse(lastTime.replace(/-/g, "/")))).getTime() / 1000;
    let secondTime = parseInt(timeNow - timeLast);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
      //获取分钟，除以60取整数，得到整数分钟
      minuteTime = parseInt(secondTime / 60);
      //获取秒数，秒数取佘，得到整数秒数
      secondTime = parseInt(secondTime % 60);
      //如果分钟大于60，将分钟转换成小时
      if (minuteTime > 60) {
        //获取小时，获取分钟除以60，得到整数小时
        hourTime = parseInt(minuteTime / 60);
        //获取小时后取佘的分，获取分钟除以60取佘的分
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    // let result = "" + parseInt(secondTime) + "s";
    let result = "" + parseInt(secondTime) + "s";

    if (minuteTime > 0) {
      result = "" + parseInt(minuteTime) + "min" + result;
    }
    if (hourTime > 0) {
      result = "" + parseInt(hourTime) + "h" + result;
    }
    return result;
  }

  static parseIntToTime(now, type) {
    let date = new Date(parseInt(now) * 1000);
    let div = "-";
    let div1 = ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours(); // 时
    let minutes = date.getMinutes(); // 分
    let seconds = date.getSeconds(); //秒
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    if (hour >= 0 && hour <= 9) {
      hour = "0" + hour;
    }
    if (minutes >= 0 && minutes <= 9) {
      minutes = "0" + minutes;
    }
    if (seconds >= 0 && seconds <= 9) {
      seconds = "0" + seconds;
    }
    if (type === DateUtils.DATETIME) {//2018-11-11 11:11
      return year + div + month + div + strDate + " " + hour + div1 + minutes;
    } else if (type === DateUtils.DATE) {//2018-11-11
      return year + div + month + div + strDate;
    } else if (type === DateUtils.TIME) {//11:11
      return hour + div1 + minutes;
    } else if (type === DateUtils.MONTH) {
      return month + div + strDate;
    }
  }
}
