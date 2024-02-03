const  Month = (month:number) =>{
    switch(month){
        case 1:
            return ("Janurary");
        case 2:
            return ("Feburary");
        case 3:
            return("March");
        case 4:
            return("April");
        case 5:
            return("May");
        case 6:
          return("June");
        case 7:
            return("July");
        case 8:
            return("August");
        case 9:
            return("September");
        case 10:
            return("October");
        case 11:
            return("November");
        case 12:
            return("December");
    }
}
export default Month;

export const Weak = (day:string)=>{
    switch(day){
        case "Sunday":
            return 0;
        case "Saturday":
            return 6;
        case "Monday":
            return 1;
        case "Tuesday":
            return 2;
        case "Wednesday":
            return 3;
        case "Thrusday":
            return 4;
        case "Friday":
            return 5;
    }
}
const isLeapYear=(year:number) =>{
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
export const MonthDays = (month:number , year:number )=>{
    
    switch(month){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        case 2:
            if( isLeapYear(year) )
                return 29 ;
            else{
                return 28;
            }
    }
}
