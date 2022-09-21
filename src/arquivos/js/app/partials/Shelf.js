import slickConfig from "Config/slick";

export default class Shelf {
    constructor(){
        this.selectors()
        this.createSlider()
    }

    selectors(){
        this.shelf = $(".shelf ul");
    }

    createSlider(){
        $('.helperComplement').remove();
        console.log("LI Adicional Removida");
        this.shelf.slick(slickConfig.productShelf.defaultShelf);
    }
}