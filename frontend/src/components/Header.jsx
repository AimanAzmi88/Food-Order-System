import TIARA from '../assets/TIARA.png';

const Header = () => {
  return (
    <header className="flex justify-center items-center fixed w-full">
      <div className="w-full h-28 overflow-hidden ">
        <img
          src={TIARA}
          alt="Tiara Logo"
          className="w-full h-full object-cover"
        />
      </div>
    </header>
  );
};

export default Header;
