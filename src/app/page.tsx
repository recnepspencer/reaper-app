import Image from "next/image";
import Button from './Components/Button';

export default function Home() {
  return (
    <div>
      <Button variant="primary">Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
    </div>
  );
};