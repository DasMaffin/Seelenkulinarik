export class Card{
    public Title: String;
    public Body: String;
    public AestheticURI: String;
    public ImageURI: String;

    public constructor(_title: String, _body: String, _aest: String, _imageURI: String){
        this.Title = _title;
        this.Body = _body;
        this.AestheticURI =_aest;
        this.ImageURI = _imageURI;
    }
}