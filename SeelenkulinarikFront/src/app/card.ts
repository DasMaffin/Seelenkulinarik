export class Card{
    public Id: String;
    public Title: String;
    public Body: String;
    public AestheticURI: String;
    public ImageURI: String;

    [key: string]: any;

    public constructor(_id: String, _title: String, _body: String, _aest: String, _imageURI: String){
        this.Id =_id;
        this.Title = _title;
        this.Body = _body;
        this.AestheticURI =_aest;
        this.ImageURI = _imageURI;
    }
}