import * as React from "react";

const HeaderImage = ({ img }: { img: string }) => (
	<img className="w-48 h-48 rounded-full" alt="Profile picture" src={img} />
);

export default HeaderImage;
