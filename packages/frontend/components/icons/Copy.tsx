import * as React from 'react';
import { SVGProps } from 'react';

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		className="h-5 w-5 cursor-pointer"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		strokeWidth={2}
		{...props}
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M8 16H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2m-6 12h8a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2z"
			className="stroke-gray-400"
		/>
	</svg>
);

export default CopyIcon;
