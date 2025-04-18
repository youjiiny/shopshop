const HeartSvg = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' {...props} viewBox='0 0 20 20'>
      <path
        d='M2.24 3.425a4.758 4.758 0 0 1 6.79 0c.416.421.74.901.971 1.413.23-.512.553-.992.97-1.413a4.758 4.758 0 0 1 6.79 0 4.91 4.91 0 0 1 0 6.88L10 18.166l-7.76-7.863-.166-.176a4.911 4.911 0 0 1 .166-6.703z'
        fillRule='evenodd'
        stroke='#ef4444'
        strokeWidth='1.5'
      ></path>
    </svg>
  );
};

export default HeartSvg;
