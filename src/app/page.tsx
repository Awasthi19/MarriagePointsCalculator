
import SignIn from '@/components/sign-in';

export default function Home() {
  /*
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        console.log("staring fetchMessage");
        const response = await axios.get(process.env.NEXT_PUBLIC_MESSAGE_URL!);
        console.log("response", response);
        setMessage(response.data.message);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMessage();
  }
  , []);*/

  return (
    <div>
      <h1>Home</h1>
      <SignIn />
    </div>
  );
}
