import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  // console.log('app-version/route:\npackageJsonPath: ', packageJsonPath);

  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  // console.log('app-version/route:\npackageJsonContent:\n', packageJsonContent);

  const { version } = JSON.parse(packageJsonContent);
  // console.log('app-version/route:\nversion: ', version);

  return NextResponse.json({ version });
}
