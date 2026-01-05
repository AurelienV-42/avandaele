import Image from "next/image";

interface HeaderImageProps {
	img: string;
}

export default function HeaderImage({
	img,
}: HeaderImageProps): React.ReactElement {
	return (
		<Image
			className="w-48 h-48 rounded-full"
			alt="Profile picture"
			src={img}
			width={192}
			height={192}
			priority
		/>
	);
}
