class HomeController {
  async index(req: Request, res: Response) {
    res.json();
  }
}

export default new HomeController();
