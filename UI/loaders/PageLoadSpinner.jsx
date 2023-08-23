'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#98ffff',
  // display: 'flex',
  margin: 'auto auto',
};

function PageLoadSpinner() {
  let [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#98ffff');
  const theme = useTheme();
  console.log(theme.theme);
  useEffect(() => {
    if (theme.theme === 'dark') {
      setColor('white');
    } else {
      setColor('#183883');
    }
  }, [theme.theme]);

  return (
    <div className="h-full  -z-10 flex items-center justify-center w-full">
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button> */}
      {/* <input
          value={color}
          onChange={(input) => setColor(input.target.value)}
          placeholder="Color of the loader"
        /> */}
      <div className="flex h-full items-center justify-center">
        <ScaleLoader cssOverride={override} loading={true} color={color} />
      </div>
    </div>
  );
}

export default PageLoadSpinner;
