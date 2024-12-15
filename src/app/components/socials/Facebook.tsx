
import Button from "../Button";
import { FaFacebook } from "react-icons/fa";
 
interface FacebookProps {
  currentGoal: string;
  setCurrentGoal: React.Dispatch<React.SetStateAction<string>>;
}
 
const Facebook: React.FC<FacebookProps> = () => {
  // const [currentGoal, setCurrentGoal] = useState("Run 5 miles this week!");
 
  const handleShare = () => {
    const shareUrl = encodeURIComponent("https://reaper-app-vert.vercel.app/home");
    const quote = encodeURIComponent(`Check out my current goal: `);
    const hashtag = encodeURIComponent("#reapergoals");
 
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${quote}&hashtag=${hashtag}`;
 
    // Open the share dialog in a new window
    window.open(
      facebookShareUrl,
      "_blank",
      "width=600,height=400,noopener,noreferrer"
    );
  };
 
  return (
<Button onClick={handleShare} variant="secondary" className="w-full mt-4 flex items-center">
<FaFacebook
        style={{ color: "#4267B2", fontSize: "24px", marginRight: "8px" }}
      />
      Share on Facebook
</Button>
  );
};
 
export default Facebook;