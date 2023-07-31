import {CountryCodes} from "@/util/statics/data";

class StringUtil {
  rexpString (input: string)  {
    const pattern = new RegExp(input.toUpperCase().split(/[,\s]+/).join('|'), "i")
    const searchResult = CountryCodes.filter(([countryCode, countryName]) => {
      return pattern.test(countryName)
    })
    console.log(searchResult)
    return searchResult
  }

  checkSameString (input: string) {
    return CountryCodes.filter(([countryCode, countryName]) => {
      return countryName === (input.toUpperCase())
    })
  }

  toTitleCase (str: string){
    return str.toLowerCase().replace(/(?:^|\s)\w/g, function(match) {
      return match.toUpperCase();
    });
  }
}

export default StringUtil