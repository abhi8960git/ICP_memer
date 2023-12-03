import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Nat16 "mo:base/Nat16";
import Text "mo:base/Text";

actor class Meme(name: Text,owner:Principal,content:[Nat16]) = this
 {
    private let itemName= name ;
    private var MemeOwner=owner;
    private let imageBytes=content;

    public query func getName(): async Text{
        return name;
    };
    public query func getOwner():async Principal{
        return owner;
    };
    public query func getAsset():async [Nat16] {
        return imageBytes;
    };
    public query func getCanisterId(): async Principal{
        return Principal.fromActor(this);
    };

    public shared(msg) func transferOwnerShip(newOwner: Principal): async Text{
        if(MemeOwner == msg.caller){
            MemeOwner :=newOwner;
            return "Success"
        }
        else{
            return "transfer Error: not initiated by owner";
        }
    };
    
};