interface Config{
    url:string
}

interface Exit{}

declare module "myPackage" {
    function init(config:Config):boolean;
    function exit(code:number):number;
}