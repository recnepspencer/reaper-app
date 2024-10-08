import Image from "next/image";
import Button from './Components/Button';
import Message from './Components/Message';

export default function Home() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Message variant="secondary">Primary Message <Button variant="secondary">X</Button></Message>
    </div>
  );
};