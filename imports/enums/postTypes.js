import React from 'react';

const PostTypesEnum = {
    NATURE: 'Nature',
    PSYCHOLOGY: 'Psychology',
    MUSIC: 'Music',
    PROGRAMMING: 'Programming',
    PROJECT_MANAGEMENT: 'Project Management',
    OTHER: 'Other'
}

//converting PostTypesEnum object into an array of objects [{value: 'stuff', label: 'stuff'}] 
const PostTypesEnumArray = [{value: '', label: ''}];
Object.entries(PostTypesEnum).forEach(([key, enumValue]) => PostTypesEnumArray.push({value: `${enumValue}`, label: `${enumValue}`}));


export default PostTypesEnum;

export{
	PostTypesEnum,
	PostTypesEnumArray
}