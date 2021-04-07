const screen = document.querySelector(".screen");
var screenString = '';
var buffer = []
var time =
{
    hour:0,
    minute:0,

    addTime: function (hour, minute)
    {
        time.hour+=hour;
        time.minute+=minute;
    },

    performCalculation : function (buffer)
    {
        if ((buffer[buffer.length-1]==='To Hrs'|| buffer[buffer.length-1]==='To Min')&& (buffer[buffer.length-2]==='To Hrs'|| buffer[buffer.length-2]==='To Min'))
        {
            return
        }

        else
        {
            positive = true;
            for (let i = 0; i < buffer.length; i++)
            {
                if (buffer[i]==='-')
                {
                    positive = false; 
                }
    
                if (buffer[i]==='+')
                {
                    positive = true; 
                }
    
                if (buffer[i]==='Hr')
                {
                    let previousNumber = '';
                    for (let j = i-1; buffer[j] !== ' ' && j!==-1; j--)
                    {
                        previousNumber+=buffer[j];
                    }
                    previousNumber = previousNumber.split("").reverse().join("");
                    positive?this.addTime(parseInt(previousNumber),0):this.addTime(-parseInt(previousNumber,0),0);
                }
                
                if (buffer[i]==='Min')
                {
                    let previousNumber = '';
                    for (let j = i-1; buffer[j] !== ' ' && j!=-1; j--)
                    {
                        previousNumber+=buffer[j];
                    }
                    previousNumber = previousNumber.split("").reverse().join("");
                    positive?this.addTime(0,parseInt(previousNumber)):this.addTime(0,-parseInt(previousNumber),0);
                }
                
            }
        }
    },

    returnResult : function ()
    {
        if(this.minute/60>=1)
        {
            this.hour = Math.floor(this.minute/60);
            this.minute = this.minute%60;
        }
        return `${this.hour}Hr ${this.minute}Min`
    },

    toHrsMin : function (command)
    {
        if (command === 'To Hrs')
        {
            return `${Math.round((this.hour + this.minute/60 + Number.EPSILON) * 1000) / 1000}Hrs`;   
        }
        else
        {
            return `${(this.hour*60 + this.minute)}Min`
        }
    }
} 

function buttonClick(value)
{
    switch (value)
    {
        case 'Hr':
        case 'Min':
            buffer.push(value, ' ');
            screenString = screenString + value + ' ';
            break;

        case '←':
            buffer.pop();
            screenString = screenString.slice(0,-1);
            break;

        case '+':
        case '-':
            if (screenString[screenString.length]===' ')
            {
                buffer.push(value, ' ');
                screenString = screenString + value + ' ';
                break;
            }
            buffer.push(' ', value, ' ');
            screenString = screenString + ' ' + value + ' ';
            break;

        case 'C':
            buffer = [];
            time.hour=0;
            time.minute=0;
            screenString = '';
            break;

        case '=':
            time.performCalculation(buffer);
            screenString = time.returnResult()
            break;

        case 'To Hrs':
        case 'To Min':
            buffer.push(value);
            time.performCalculation(buffer);
            screenString = time.toHrsMin(value);
            break;

        default:
            buffer.push(value)
            screenString+=value;
            break;
    }

    if (screenString.length===0)
    {
        screen.innerText = '0';
    }
    else
    {
        screen.innerText = screenString;
    }
}

function init()
{
    document.querySelector(".calc-buttons").addEventListener("click", function(event)
    {
        buttonClick(event.target.innerText);
    });
}

init();