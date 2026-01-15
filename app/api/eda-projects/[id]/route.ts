import edaProjects from '@/data/eda-projects.json';

type EdaProject = {
  序号: number;
  代码: string;
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  // 将 "001" 转为数字 1
  const projectNumber = parseInt(id, 10);

  if (Number.isNaN(projectNumber)) {
    return new Response('Invalid project id', { status: 400 });
  }

  const project = (edaProjects as EdaProject[]).find(
    (p) => p.序号 === projectNumber
  );

  if (!project) {
    return new Response('Project not found', { status: 404 });
  }

  return new Response(project.代码, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'X-Robots-Tag': 'noindex',
    },
  });
}


