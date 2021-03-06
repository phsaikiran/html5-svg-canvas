import Screen from "./screen";
import { Item, TextConfig } from "../types";

class sText extends Item<sText> {
    scr: Screen;
    text: string;
    x: number;
    y: number;
    fontSize: string;
    fontFamily: string;
    fillColor: string;

    svgText: SVGTextElement;
    svgTextNode: Text;

    constructor({scr, text, x, y, fontSize, fontFamily, fillColor}: TextConfig) {
        super();
        this.scr = scr;
        this.text = text ? text : "";
        this.x = x ? x : 0;
        this.y = y ? y : 0;
        this.fontSize = fontSize ? fontSize : '13';
        this.fontFamily = fontFamily ? fontFamily : 'Arial';
        this.fillColor = fillColor ? fillColor : 'black';

        if (this.scr.type === "svg" && this.scr.ctx instanceof SVGSVGElement) {
            this.svgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
            this.svgTextNode = document.createTextNode(this.text);
            this.svgText.appendChild(this.svgTextNode);
            this.scr.ctx.appendChild(this.svgText);
        }
    }

    // @ts-ignore
    colliding = (that: sText) => {
        return false;
    }

    update = () => {
        let text = this.scr.name + " | " + this.scr.type + " | " + this.scr.fps.toFixed(2) + " fps | dt = " + this.scr.dt + "ms";
        if (this.scr.type === "canvas" && this.scr.ctx instanceof CanvasRenderingContext2D) {
            this.scr.ctx.font = this.fontSize + "px " + this.fontFamily;
            this.scr.ctx.fillStyle = this.fillColor;
            this.scr.ctx.fillText(text, this.x, this.y);
        } else if (this.scr.type === "svg" && this.scr.ctx instanceof SVGSVGElement) {
            this.svgText.setAttributeNS(null, "x", String(this.x));
            this.svgText.setAttributeNS(null, "y", String(this.y));
            this.svgText.setAttributeNS(null, "font-size", this.fontSize);
            this.svgText.setAttributeNS(null, "font-family", this.fontFamily);
            this.svgText.setAttributeNS(null, "fill", this.fillColor);
            this.svgTextNode.deleteData(0, this.svgTextNode.data.length);
            this.svgTextNode.insertData(0, text);
        } else if (this.scr.type === "webgl2" && this.scr.ctx instanceof WebGL2RenderingContext) {

        } else {
            console.error("Invalid type given to draw text");
        }
    }
}

export default sText;
