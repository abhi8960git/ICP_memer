import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import HashMap "mo:base/HashMap";
import List "mo:base/List";
import Nat16 "mo:base/Nat16";
import MemeActorClass "./meme";
import Cycles "mo:base/ExperimentalCycles"

actor Memera{
    private type Listing ={ 
        itemOwner: Principal;
        // itemLikedBy: List.List<Principal>;
    };
    //storing nft with their principals 
    var mapOfMeme = HashMap.HashMap<Principal,MemeActorClass.Meme>(1,Principal.equal,Principal.hash);
    //1 is initial capacity, equality of principal, hash of principal
    //considering one guy owns complete ownership of a Meme, but one guy can own many Memes
    var mapOfOwners = HashMap.HashMap<Principal,List.List<Principal>>(1,Principal.equal,Principal.hash);

    //mapping a meme to the owner Id and the likes it has on a particular network
    var mapOfSocial = HashMap.HashMap<Principal,Listing> (1,Principal.equal,Principal.hash);

    
    public shared(msg) func Mint(imgData: [Nat16],name:Text): async Principal{
        let owner = msg.caller;
        //experimental cycles for miniting check if optional
        Cycles.add(100_500_000_000);
        let newMeme = await MemeActorClass.Meme(name,owner,imgData);
        let newMemePrincipal = await newMeme.getCanisterId();
        //store 
        mapOfMeme.put(newMemePrincipal,newMeme);
        addToOwnershipMap(owner,newMemePrincipal);
        let newListing:Listing ={
                        itemOwner=owner;
                    };
                    mapOfSocial.put(newMemePrincipal,newListing);
                    
        return newMemePrincipal;
    };

     public query func isListed(id:Principal):async Bool{
        if(mapOfSocial.get(id)== null)
        {
            return false;
        }
        else{
            return true;
        }
    };

    private func addToOwnershipMap(owner:Principal,MemeId:Principal){
        var ownedMemes:List.List<Principal> = switch(mapOfOwners.get(owner)){
            case null List.nil<Principal>();
            case (?result) result;
        };
        //update
        ownedMemes :=List.push(MemeId,ownedMemes);
        mapOfOwners.put(owner,ownedMemes);

    };

    public query func getOwnedMemes(owner:Principal): async [Principal]{
        var ownerMemes: List.List<Principal> = switch(mapOfOwners.get(owner)){
            case null List.nil<Principal>();
            case (?result) result;
        };
        return List.toArray(ownerMemes);
    };

    // public query func getMemeLikes(memeId:Principal): async Nat16{
        
    //     var listing: Listing = switch(mapOfSocial.get(memeId)){
    //         case null return 0;
    //         case (?result) return result.itemLikedBy.size();
    //     };
        
    //     return ?Nat16;
        
    // };

    public query func getMemeListing(memeId:Principal): async Listing{
        let nullListing : Listing ={
            itemOwner = Principal.fromText("36y4s-b2xob-glukf-qskkz-4xd5z-cv5yk-eqsiu-y2wml-n63ju-mcxga-pqe");
            // itemLikes= 0;
            // itemLikedBy= List.nil<Principal>();
        };
        var listing: Listing = switch(mapOfSocial.get(memeId)){
            case null return nullListing;
            case (?result) return result;
        };
        return listing;
    };

    // public shared(msg) func likeMeme(memeId:Principal):async Text{
    //     var meme = await getMemeListing(memeId);
    //     if(meme.itemOwner == msg.caller){
    //         return "cannot like your own meme"
    //     }
    //     else if(meme.itemLikedBy.get(msg.caller) !=null){
    //         return "meme already liked by you"
    //     }
    //     else{
    //         meme.itemLikedBy.put(msg.caller);
    //         return "success"
    //     }
    // };

    public query func getMemeraCanisterId() : async Principal{
        return Principal.fromActor(Memera);
    };

    public shared(msg) func getYourId(): async Text{
        let user = msg.caller;
        return Principal.toText(user);
    };

    public query func getExistingMemes():async [Principal]{
       return Iter.toArray(mapOfMeme.keys());
    };
    public query func getOriginalOwner(id:Principal):async Principal{
        var listing: Listing = switch(mapOfSocial.get(id)){
            case null return Principal.fromText("");
            case (?result) result;
        };
        return listing.itemOwner;
    };

    public query func getListedMemes():async [Principal]{
       return Iter.toArray(mapOfSocial.keys());
    };

    public shared(msg) func listItem(id:Principal,price:Nat):async Text{
        //question return process
            var item : MemeActorClass.Meme = switch(mapOfMeme.get(id)){
                case null return "NFT does not exist";
                case (?result) result;
            };
            let owner=await item.getOwner();
            if(Principal.equal(owner,msg.caller)){
                    let newListing:Listing ={
                        itemOwner=owner;
                        itemPrice=price;
                    };
                    mapOfSocial.put(id,newListing);
                    return "Success";
            }
            else{
                return "you don't owm this nft"

            }
            
    };
}