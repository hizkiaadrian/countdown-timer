export class AppEvent {
    name: string;
    datetime: Date;

    constructor(name: string, datetime: Date) {
        this.name = name;
        this.datetime = datetime;
    }

    parseTimeRemaining = () : string => {
        let timeRemaining = this.datetime.getTime() - new Date().getTime();
        if (timeRemaining < 0) {
            return "Event has passed";
        }
    
        let result: string = "";
    
        const days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        if (days > 0) result += `${days}D `;
        timeRemaining -= days * (1000 * 60 * 60 * 24);
    
        const hours: number = Math.floor(timeRemaining / (1000 * 60 * 60));
        if (hours > 0 || days > 0) result += `${hours}H `;
        timeRemaining -= hours * (1000 * 60 * 60);
    
        const minutes: number = Math.floor(timeRemaining / (1000 * 60));
        if (minutes > 0 || hours > 0 || days > 0) result += `${minutes}M `;
        timeRemaining -= minutes * 1000 * 60;
    
        const seconds: number = Math.round(timeRemaining / 1000);
        if (days === 0) result += `${seconds}S`;
    
        return result;
    }
};
