/**
* LUMEX LDM 64*32 顯示器的函數
*/

//% weight=12 color=#69b512 icon="\uf09e" block="LDM64*32 MQTT"
namespace LumexLDM6432_MQTT {
    let normalDelay=250
    let longDelay=2000
    let deviceID=""
    let privateTopic=""
    let publicTopic=""
    let ldmTopic=""
    let foreColor=111

    export enum on_off {
        //% block="ON"
        on = 1,
        //% block="OFF"
        off = 0
    }
    export enum fontSize {
        //% block="5*7"
        smallSize = 0x81,
        //% block="8*16"
        bigSize = 0x83
    }
    export enum showNow {
        //% block="now"
        yes = 0xd1,
        //% block="later"
        no = 0x00
    }
    export enum patternType {
        //% block="8*8"
        type1 = 0xc0,
        //% block="8*16"
        type2 = 0xc1,
        //% block="16*16"
        type3 = 0xc2,
        //% block="32*32"
        type4 = 0xc3
    }
    export enum positiveType {
        //% block="positive"
        type1 = 1,
        //% block="negative"
        type2 = 0
    }
    export enum filledType {
        //% block="no"
        type1 = 0,
        //% block="yes"
        type2 = 1
    }

    export enum transitionType {
        //% block="upward"
        type1 = 0,
        //% block="downward"
        type2 = 1,
        //% block="leftward"
        type3 = 2,
        //% block="rightward"
        type4 = 3
    }

    export enum moveType {
        //% block="inside out"
        type1 = 0,
        //% block="outside in"
        type2 = 1
    }

    export enum colorCode {
        //% block="black"
        color0 = 0,
        //% block="white"
        color111 = 111,
        //% block="red"
        color96 = 96,
        //% block="orange"
        color100 = 100,
        //% block="yellow"
        color108 = 108,
        //% block="green"
        color4 = 4,
        //% block="blue"
        color3 = 3,
        //% block="indigo"
        color66 = 66,
        //% block="purple"
        color99 = 99,
        //% block="dark red"
        color32 = 32,
        //% block="pink"
        color103 = 103,
        //% block="earth yellow"
        color104 = 104,
        //% block="lime"
        color12 = 12
    }

    export enum animationType {
        //% block="fly in and out upward"
        type1 = 2,
        //% block="fly in and out downward"
        type2 = 3,
        //% block="fly in and out leftward"
        type3 = 4,
        //% block="fly in and out rightward"
        type4 = 5,
        //% block="blink"
        type5 = 6,
        //% block="fly in downward"
        type6 = 7,
        //% block="fly in upward"
        type7 = 8,
        //% block="fly in rightward"
        type8 = 9,
        //% block="fly in leftward"
        type9 = 10,
        //% block="fly in down-rightward"
        type10 = 11,
        //% block="fly in down-leftward"
        type11 = 12,
        //% block="fly in up-rightward"
        type12 = 13,
        //% block="fly in up-leftward"
        type13 = 14,
        //% block="fly in from each direction"
        type14 = 15
    }
    
    export enum yesOrNo {
        //% block="yes"
        yes = 1,
        //% block="no"
        no = 0
    }

    export enum usrPatternType {
        //% block="5*5"
        type1 = 5,
        //% block="8*8"
        type2 = 8,
        //% block="12*12"
        type3 = 12,
        //% block="16*16"
        type4 = 16
    }

    export enum moveDirection {
        //% block="upward"        
        upward=32,
        //% block="downward" 
        downward=33,
        //% block="leftward" 
        leftward=34,
        //% block="rightward" 
        rightward=35
    }

    function convertNumToHexStr(myNum: number, digits: number): string {
        let tempDiv = 0
        let tempMod = 0
        let myStr = ""
        tempDiv = myNum
        while (tempDiv > 0) {
            tempMod = tempDiv % 16
            if (tempMod > 9) {
                myStr = String.fromCharCode(tempMod - 10 + 97) + myStr
            } else {
                myStr = tempMod + myStr
            }
            tempDiv = Math.idiv(tempDiv, 16)
        }
        while (myStr.length != digits) {
            myStr = "0" + myStr
        }
        return myStr
    }

    function publishMQTT(myCommand:string,delayTime:number): void{
        KSRobot_IOT.MQTTPublish(ldmTopic, myCommand)
        basic.pause(delayTime)
    }

    //% blockId="LDM_setDeviceID" block="control the device ID %myID of the LDM"
    //% weight=100 blockGap=10
    export function LDM_setDeviceID(myID:string): void{
        deviceID=myID
        privateTopic="ezDisplay/"+deviceID
        ldmTopic=privateTopic
    }

    //% blockId="LDM_setPublicTopic" block="control your LDMs，MQTT Topic %myTopic"
    //% weight=99 blockGap=10
    export function LDM_setPublicTopic(myTopic:string): void{
        publicTopic=myTopic
        ldmTopic=publicTopic
    }

    //% blockId="LDM_clear" block="LDM clear"
    //% weight=98 blockGap=10
    export function LDM_clear(): void {
        publishMQTT("ATd0=()", normalDelay)
    }
    
    //% blockId="LDM_display" block="LDM display"
    //% weight=97 blockGap=10
    export function LDM_display(): void {
        publishMQTT("ATd1=()", normalDelay)
    }

    //% blockId="LDM_on" block="set LDM %myOn_Off"
    //% weight=96 blockGap=10
    export function LDM_on(myOn_Off:on_off): void {
        if (myOn_Off==1)
          publishMQTT("ATf1=()", normalDelay)
        else
          publishMQTT("ATf0=()", normalDelay)
    }

    //% blockId="LDM_displayFirmware"  block="display firmware Revision"
    //% weight=95 blockGap=10
    export function LDM_displayFirmware(): void {
        publishMQTT("AT20=()", normalDelay)
    }

    //% blockId="LDM_setClock" block="set clock mode %myOn_Off"
    //% weight=94 blockGap=10
    export function LDM_setClock(myOn_Off:on_off): void {
        if (myOn_Off==1)
          publishMQTT("run", longDelay)
        else
          LDM_stopPages()
    }

    //% blockId="LDM_ATcommand" block="execute AT command: %atCommand"
    //% weight=93 blockGap=10
    export function LDM_ATcommand(atCommand: string): void {
        publishMQTT(atCommand, normalDelay)
    }

    //% blockId="LDM_playPage1" block="display single page(0~6) stored in the LDM without animation: %myPage"
    //% weight=92 blockGap=10 blockInlineInputs=true myPage.min=0 myPage.max=6
    export function LDM_playPage1(myPage: number): void {
        publishMQTT("ATfc=(" + myPage + ")", normalDelay)
    }

    /*
    //% blockId="LDM_effectSpeed" block="set effect animation speed(1~10) %mySpeed"
    //% weight=91 blockGap=10 blockInlineInputs=true mySpeed.min=1 mySpeed.max=10 mySpeed.defl=1
    export function LDM_effectSpeed(mySpeed: number): void {
        publishMQTT("ATbf=(" + mySpeed + ")", normalDelay)
    }

    //% blockId="LDM_pagesInterval" block="set multi pages interval time between every page %myInterval"
    //% weight=90 blockGap=10 blockInlineInputs=true myInterval.min=1 myInterval.max=10 myInterval.defl=1
    export function LDM_pagesInterval(myInterval: number): void {
        publishMQTT("ATbe=(" + myInterval + ")", normalDelay)
    }
    */

    //% blockId="LDM_playPage2" block="display single page(0~6) stored in the LDM: %myPage|animation %effect|speed(1~10) %mySpeed"
    //% weight=89 blockGap=10 blockInlineInputs=true myPage.min=0 myPage.max=6 effect.min=1 effect.max=15 mySpeed.min=1 mySpeed.max=10 mySpeed.defl=1
    export function LDM_playPage2(myPage: number, effect: animationType,mySpeed:number): void {
        LDM_stopPages()
        publishMQTT("ATbf=(" + mySpeed + ")", normalDelay)
        publishMQTT("ATfc=(" + myPage + ")", normalDelay)
        publishMQTT("ATfd=(" + effect + ")", normalDelay)
    }

    //% blockId="LDM_playPages" block="display multi pages stored in the LDM |number of pages(2~7) %pages|animation %effect|speed(1~10) %mySpeed"
    //% weight=88 blockGap=10 blockInlineInputs=true pages.min=2 pages.max=7 effect.min=16 effect.max=30 mySpeed.min=1 mySpeed.max=10 mySpeed.defl=1
    export function LDM_playPages(pages: number, effect: animationType, mySpeed: number): void {
        LDM_stopPages()
        publishMQTT("ATbf=(" + mySpeed + ")", normalDelay)
        publishMQTT("ATdf=(" + pages + ")", normalDelay)
        //清掉特效
        if (effect > 1 && effect < 7)
            effect += 14
        else if (effect > 6 && effect < 16)
            effect += 15
        publishMQTT("ATfd=(" + effect + ")", normalDelay)
    }

    //% blockId="LDM_stopPages" block="stop display animation"
    //% weight=87 blockGap=10 blockInlineInputs=true
    export function LDM_stopPages(): void {
      publishMQTT("ATfd=(0)", longDelay)
    }

    //% blockId="LDM_saveToRom" block="write dipslay contents to current displayed EEPROM page address"
    //% weight=86 blockGap=10
    export function LDM_saveToRom(): void {
        publishMQTT("ATfe=()", normalDelay)
    }

    //% blockId="LDM_setPatternOverlay" block="set font or pattern overlay on background: %myAns"
    //% weight=85 blockGap=10
    export function LDM_setPatternOverlay(myAns:yesOrNo): void {
        if (myAns==1)
            publishMQTT("AT2b=(0)", normalDelay)
        else
            publishMQTT("AT2b=(1)", normalDelay)
    }

    //% blockId="LDM_getColor" block="color code %myColor"
    //% weight=84 blockGap=10
    export function LDM_getColor(myColor: colorCode): number {
        return myColor
    }

    //% blockId="LDM_setForeColor" block="set font or painting color code(0~111): %myColor"
    //% weight=83 blockGap=10 myColor.min=0 myColor.max=111 
    export function LDM_setForeColor(myColor: number): void {
        if (myColor!=foreColor){
           foreColor=myColor
           publishMQTT("ATef=(" + myColor + ")", normalDelay)
        }
    }

    //% blockId="LDM_putString" block="LDM put string: %myStr|size: %mySize|on line: %line|column: %column"
    //% weight=82 blockGap=10 blockInlineInputs=true line.min=0 line.max=3 column.min=0 column.max=19
    export function LDM_putString(myStr: string, mySize: fontSize, line: number, column: number): void {
        if (myStr.length > 0) {
            if (mySize == 0x81)
                publishMQTT("AT81=(" + line + "," + column + "," + myStr + ")", normalDelay)
            else if (mySize == 0x83)
                publishMQTT("AT83=(" + line + "," + column + "," + myStr + ")", normalDelay)
        }
    }

    //% blockId="LDM_setBackColor" block="set LDM background color %backColor"
    //% weight=81 blockGap=10 backColor.min=0 backcolor.max=111 
    export function LDM_setBackColor(backColor: number): void {
        publishMQTT("ATec=(" + backColor + ")", normalDelay)
    }

    //% blockId="LDM_changeColor" block="swap displayed color from color %color1| to color %color2"
    //% weight=80 blockGap=10 color1.min=0 color1.max=111 color2.min=0 color2.max=111
    export function LDM_changeColor(color1: number, color2: number): void {
        publishMQTT("ATcc=(" + color1 + "," + color2 + ")", normalDelay)
    }

    //% blockId="LDM_changeColorArea" block="swap displayed color in the area:|x for the top left corner:%x|y for the top left corner:%y|width:%width|height:%height|from color %color1| to color %color2"
    //% weight=79 blockGap=10 color1.min=0 color1.max=111 color2.min=0 color2.max=111 x.min=0 x.max=63 y.min=0 y.max=31 width.min=1 width.max=64 height.min=1 height.max=32
    export function LDM_changeColorArea(x: number, y: number, width:number, height:number, color1:number, color2:number): void {
        publishMQTT("ATcf=("+x+","+y+","+width+","+height+"," + color1 + "," + color2 + ")", normalDelay)
    }

    //% blockId="LDM_setXYcolor" block="set the color code %color| to X: %x| Y: %y"
    //% weight=78 blockGap=10 color.min=0 color.max=111 x.min=0 x.max=63 y.min=0 y.max=31
    export function LDM_setXYcolor(color: number, x: number, y: number): void {
        publishMQTT("ATee=(" + x + "," + y + "," + color + ")", normalDelay)
    }

    //% blockId="LDM_changeToOneColor" block="change color of all pixels except the black color pixels to color code %color"
    //% weight=77 blockGap=10 color.min=0 color.max=111
    export function LDM_changeToOneColor(color: number): void {
        publishMQTT("ATc0=(" +color + ")", normalDelay)
    }

    //% blockId="LDM_drawLine" block="draw a line|first point X %x0|first point Y %y0|second point X %x1|second point Y %y1|color code(0~111) %color"
    //% weight=100 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 x1.min=0 x1.max=63 y1.min=0 y1.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawLine(x0: number, y0: number, x1: number, y1: number, color: number): void {
        publishMQTT("AT90=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")", normalDelay)
    }

    //% blockId="LDM_drawRectangle" block="draw a rectangle|filled %myFilled|up left corner X %x0|up left corner Y %y0|bottom right corner X %x1|bottom right corner Y %y1|color code(0~111) %color"
    //% weight=98 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 x1.min=0 x1.max=63 y1.min=0 y1.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawRectangle(myFilled: filledType, x0: number, y0: number, x1: number, y1: number, color: number): void {
        if (myFilled == 0)
            publishMQTT("AT91=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")", normalDelay)
        else
            publishMQTT("AT92=(" + x0 + "," + y0 + "," + x1 + "," + y1 + "," + color + ")", normalDelay)
    }

    //% blockId="LDM_drawCircle" block="draw a circle|filled %myFilled|center X %x0|center Y %y0|radius %radius|color code(0~111) %color"
    //% weight=96 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawCircle(myFilled: filledType, x0: number, y0: number, radius: number, color: number): void {
        if (myFilled == 0)
            publishMQTT("AT94=(" + x0 + "," + y0 + "," + radius + "," + color + ")", normalDelay)
        else
            publishMQTT("AT95=(" + x0 + "," + y0 + "," + radius + "," + color + ")", normalDelay)
    }

    //% blockId="LDM_drawSquare" block="draw a square|up left corner X %x0|up left corner Y %y0|width %width|color code(0~111) %color"
    //% weight=94 blockGap=10 blockInlineInputs=true x0.min=0 x0.max=63 y0.min=0 y0.max=31 color.min=0 color.max=111 advanced=true
    export function LDM_drawSquare(x0: number, y0: number, width: number, color: number): void {
        publishMQTT("AT93=(" + x0 + "," + y0 + "," + width + "," + color + ")", normalDelay)
    }

    //% blockId="LDM_setScroll" block="scroll the whole display %transition|shift time(1~200ms) %time"
    //% weight=80 blockGap=10 blockInlineInputs=true time.min=1 time.max=200 advanced=true
    export function LDM_setScroll(transition: transitionType, time: number): void {
        if (time < 1)
            time = 1
        if (time > 200)
            time = 200
        publishMQTT("AT" + convertNumToHexStr(transition + 0xd2, 2) + "=(" + time + ")", normalDelay)
    }

    //% blockId="LDM_eraseImageInOut" block="erase the whole display %myMove|shift time(1~200ms) %time"
    //% weight=78 blockGap=10 time.min=1 time.max=200 blockInlineInputs=true advanced=true
    export function LDM_eraseImageInOut(myMove: moveType, time: number): void {
        publishMQTT("AT" + convertNumToHexStr(myMove + 0xaa, 2) + "=(" + time + ")", normalDelay)
    }

    //% blockId="LDM_showImageInOut" block="display the whole display %myMove|shift time(1~200ms) %time"
    //% weight=76 blockGap=10 time.min=1 time.max=200 blockInlineInputs=true advanced=true
    export function LDM_showImageInOut(myMove: moveType, time: number): void {
        publishMQTT("AT" + convertNumToHexStr(myMove + 0xa8, 2) + "=(" + time + ")", normalDelay)
    }

    //% blockId="LDM_saveDisplayed" block="save the whole display contents to RAM"
    //% weight=60 blockGap=10 advanced=true
    export function LDM_saveDisplayed(): void {
        publishMQTT("AT2c=()", normalDelay)
    }

    //% blockId="LDM_loadDisplayed" block="load and show the whole display contents from RAM"
    //% weight=58 blockGap=10 advanced=true
    export function LDM_loadDisplayed(): void {
        publishMQTT("AT2d=()", normalDelay)
    }

    //% blockId="LDM_loadPattern" block="load user pattern from EEPROM|pattern type:%myPattern|Pattern ID: %myID to |X:%x|Y:%y|display now %show"
    //% weight=54 blockGap=10 x.min=0 x.max=63 y.min=0 y.max=31 myID.min=0 myID.max=24 advanced=true
    export function LDM_loadPattern(myPattern: usrPatternType, myID: number, x: number, y: number, show: yesOrNo): void {
        let myStr = "AT29=("
        if (show == 0)
            myStr = "AT2e=("
        publishMQTT(myStr + x + "," + y + "," + myPattern + "," + myPattern + "," + myID + ")", normalDelay)
    }

    //% blockId="LDM_movePattern" block="move user pattern 1 pixel %myDir|pattern type:%myPattern|Pattern ID: %myID"
    //% weight=52 blockGap=10 myID.min=0 myID.max=24 advanced=true
    export function LDM_movePattern(myDir :moveDirection,myPattern: usrPatternType, myID: number): void {
        publishMQTT("AT"+myDir+"=(" +myPattern + "," + myPattern + "," + myID + ")", normalDelay)
    }

    //% blockId="LDM_showAll" block="Display the multi patterns in the same time"
    //% weight=50 blockGap=10 advanced=true
    export function LDM_showAll(): void {
        publishMQTT("AT2f=()", normalDelay)
    }

}