import { Injectable } from '@angular/core';
import { Firestore, Unsubscribe, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Logger } from '../logger/logger.service';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private firestore: Firestore,
    private authService: AuthService,
    private logger: Logger, private auth: AuthService) { }

  async emitVote(picture: string, gallery: string) {
    try {
      const user = this.authService.user?.email;

      if (!user) {
        console.log("ERRRRRRRRRRRRRRRRRR");
        console.log(this.auth.user?.email + "bbbbbbbbbbbbbb");
        return;
      }
      console.log(this.auth.user?.email + "cccccccccccccc");
      const ref = doc(this.firestore, 'votaciones', user as string);
      const docSnap = await getDoc(ref);

      if (docSnap.exists()) {
        if (gallery === 'lindas') {
          await updateDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          await updateDoc(ref, {
            feas: picture
          });
        }
      } else {
        if (gallery === 'lindas') {
          await setDoc(ref, {
            lindas: picture
          });
        } else if (gallery === 'feas') {
          await setDoc(ref, {
            feas: picture
          });
        }
      }
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getVote(gallery: string) {
    try {
      const user = this.authService.user?.email;
      const docRef = doc(this.firestore, 'votaciones', user!);

      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return data[gallery];
      }
    } catch (e: any) {
      this.logger.logError(e);
    }
  }

  async getAllNice(): Promise<string[]> {
    return await this.getAllByCategory('lindas');
  }

  async getAllUgly(): Promise<string[]> {
    return await this.getAllByCategory('feas');
  }

  private async getAllByCategory(category: string): Promise<string[]> {
    const result: string[] = [];
    try {
      const q = query(collection(this.firestore, 'votaciones'));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data[category]) {
          result.push(data[category]);
        }
      });
    } catch (e: any) {
      this.logger.logError(e);
    } finally {
      return result;
    }
  }
}
